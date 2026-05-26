import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";
import nodemailer from "nodemailer";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// Helper to get Gemini client lazily to avoid crash on startup if key is missing
let aiClient: GoogleGenAI | null = null;
function getGeminiClient(): GoogleGenAI {
  if (!aiClient) {
    const key = process.env.GEMINI_API_KEY;
    if (!key) {
      throw new Error("GEMINI_API_KEY is not configured in environment variables. Please add it via the Secrets panel in AI Studio Settings.");
    }
    aiClient = new GoogleGenAI({
      apiKey: key,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        }
      }
    });
  }
  return aiClient;
}

// Lazy initialization of mail transporter to avoid crash on startup
let cachedPass: string | null = null;
let mailTransporter: any = null;

function getMailTransporter() {
  const user = process.env.GMAIL_USER || "gpstudiospretoria@gmail.com";
  const pass = process.env.GMAIL_APP_PASS;

  if (!pass) {
    console.warn("[Email Pipeline] GMAIL_APP_PASS is not configured. NodeMailer operates in mock-reporting mode.");
    return null;
  }

  if (!mailTransporter || cachedPass !== pass) {
    console.log(`[Email Pipeline] Activating live SMTP transport tunnel for user: ${user}`);
    cachedPass = pass;
    mailTransporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user,
        pass
      },
      connectionTimeout: 10000, // 10s connection timeout - avoids hanging
      greetingTimeout: 10000,   // 10s greeting timeout
      socketTimeout: 15000,     // 15s socket activity timeout
      debug: true,              // Log session steps to server stdout for precise troubleshooting
      logger: true,             // Log transport state transitions
      tls: {
        // Safe bypass for strict cloud sandbox self-signed certificates
        rejectUnauthorized: false
      }
    });
  }
  return mailTransporter;
}

async function sendDraftEmail(service: string, details: any, draftText: string) {
  const defaultRecipient = "gpstudiospretoria@gmail.com";
  const authenticatedUser = process.env.GMAIL_USER || "gpstudiospretoria@gmail.com";
  const pass = process.env.GMAIL_APP_PASS;

  if (!pass) {
    console.warn("[Email Pipeline] GMAIL_APP_PASS is not configured. App runs in mock dispatch mode.");
    return {
      success: false,
      error: "GMAIL_APP_PASS environment variable is missing in AI Studio Secrets.",
      appPassMissing: true,
      recipient: defaultRecipient
    };
  }

  // Construct recipients list: send to both admin and authenticated user if they are different
  const recipientsList = [defaultRecipient];
  if (authenticatedUser && authenticatedUser.toLowerCase() !== defaultRecipient.toLowerCase()) {
    recipientsList.push(authenticatedUser);
  }
  const toField = recipientsList.join(", ");

  const mailText = `
GP STUDIO PRETORIA - DRAFT DETAILS E-MAIL DISPATCH
==================================================
Service Module: ${service.toUpperCase()}
Targets: ${toField}
Timestamp: ${new Date().toISOString()}

INPUTS PROVIDED BY VISITOR:
${Object.entries(details).map(([k, v]) => `- ${k.toUpperCase()}: ${v}`).join("\n")}

==================================================
COMPOSED OUTLINE / DRAFTED DATA:
==================================================
${draftText}
  `.trim();

  const mailHtml = `
    <div style="font-family: inherit, 'Courier New', monospace; background-color: #0c0c0c; color: #f5f5f5; padding: 40px; max-width: 650px; margin: auto; border: 1px solid #1a1a1a; font-size: 13px; line-height: 1.6;">
      <div style="text-align: center; margin-bottom: 25px;">
        <h2 style="color: #10b981; text-transform: uppercase; font-size: 24px; font-weight: 900; letter-spacing: -0.05em; margin: 0;">GP Studio Pretoria.</h2>
        <span style="font-size: 10px; color: #555; font-weight: bold; text-transform: uppercase; letter-spacing: 0.25em;">Fulfillment Draft Network</span>
      </div>
      
      <div style="border-top: 1px solid #222; border-bottom: 1px solid #222; padding: 15px 0; margin-bottom: 25px;">
        <table style="width: 100%; font-size: 12px; color: #aaa;">
          <tr>
            <td style="font-weight: bold; width: 140px; color: #555; text-transform: uppercase;">Service Target:</td>
            <td style="color: #fff; font-weight: bold;">GP ${service.toUpperCase()} OUTLINE</td>
          </tr>
          <tr>
            <td style="font-weight: bold; color: #555; text-transform: uppercase;">Delivery:</td>
            <td>${toField}</td>
          </tr>
          <tr>
            <td style="font-weight: bold; color: #555; text-transform: uppercase;">Source:</td>
            <td>Interactive AI Workspace</td>
          </tr>
          <tr>
            <td style="font-weight: bold; color: #555; text-transform: uppercase;">UTC Action:</td>
            <td>${new Date().toISOString()}</td>
          </tr>
        </table>
      </div>

      <h3 style="color: #fff; font-size: 11px; text-transform: uppercase; letter-spacing: 0.1em; margin-bottom: 10px;">User Context Attributes</h3>
      <div style="background-color: #050505; border: 1px solid #151515; padding: 15px; margin-bottom: 25px;">
        <ul style="list-style-type: none; padding: 0; margin: 0; font-size: 11px; color: #ccc;">
          ${Object.entries(details).map(([k, v]) => `
            <li style="margin-bottom: 8px; border-bottom: 1px solid #111; padding-bottom: 6px;">
              <span style="font-weight: bold; color: #10b981; text-transform: uppercase; display: block; margin-bottom: 2px;">${k.toUpperCase()}:</span>
              <span style="color: #eee;">${v}</span>
            </li>
          `).join("")}
        </ul>
      </div>

      <h3 style="color: #fff; font-size: 11px; text-transform: uppercase; letter-spacing: 0.1em; margin-bottom: 10px;">Generated Draft Content Payload</h3>
      <div style="background-color: #050505; border: 1px solid #151515; padding: 25px; white-space: pre-wrap; font-family: monospace; font-size: 11px; color: #ccc; border-left: 3px solid #10b981; line-height: 1.6;">
        ${draftText}
      </div>
      
      <div style="margin-top: 35px; border-top: 1px solid #1a1a1a; padding-top: 15px; font-size: 10px; color: #555; text-align: center; text-transform: uppercase; letter-spacing: 0.1em;">
        Fulfillment Security: Pretoria Document Specialty Group © 2026.
      </div>
    </div>
  `;

  try {
    const transporter = getMailTransporter();
    if (transporter) {
      console.log(`[Email Pipeline] Dispatched envelope: from <${authenticatedUser}>, to [${toField}]`);
      const info = await transporter.sendMail({
        from: `"GP Studio Pretoria" <${authenticatedUser}>`,
        to: toField,
        replyTo: authenticatedUser,
        subject: `[GP Studio Pretoria] Composed Draft Payload: ${service.toUpperCase()}`,
        text: mailText,
        html: mailHtml
      });
      console.log(`[Email Pipeline] Email successfully dispatched: ${info.messageId}`);
      return { success: true, messageId: info.messageId, recipient: toField };
    } else {
      return { success: false, error: "Failed to initialize standard mail transport client.", recipient: toField };
    }
  } catch (err: any) {
    console.error("[Email Pipeline] NodeMailer threw error during dispatch sequence:", err.message);
    const errText = String(err.message || "");
    const badCredentials = errText.includes("535") || errText.toLowerCase().includes("invalid login") || errText.toLowerCase().includes("username and password not accepted");
    return { 
      success: false, 
      error: `${err.name || "SMTP Error"}: ${errText}`, 
      recipient: toField, 
      badCredentials 
    };
  }
}

// Full API endpoint designed to generate high-impact documents using Gemini

app.post("/api/generate-draft", async (req, res) => {
  try {
    const { service, details } = req.body;

    if (!service || !details) {
      return res.status(400).json({ error: "Missing required fields: service and details are required." });
    }

    let systemInstruction = "You are an elite, high-stakes CRO (Conversion Rate Optimization) copywriter and document engineer from Pretoria, South Africa. Your goal is to construct extremely professional, impactful, structured document layouts that sell ideas, values, and credentials, using Pretoria/Gauteng standard high-stakes structures.";
    let prompt = "";

    if (service === "cv") {
      prompt = `
        Draft a high-impact Professional CV Overview and dynamic Cover Letter match.
        
        Candidate Name: ${details.name || "N/A"}
        Target Role: ${details.role || "N/A"}
        Key Skills: ${details.skills || "N/A"}
        Experience Details: ${details.experience || "N/A"}
        Academics/Other: ${details.academics || "N/A"}

        Format your response cleanly. Use the following exact structural blocks (you can use direct Markdown formatting):
        
        # 👑 PROFESSIONAL STANDING PROFILE
        Write a hyper-focused, bold 3-sentence summary that brands the candidate as an elite talent for the ${details.role} role.

        # 🚀 CORE STRATEGIC COMPETENCIES
        List 6 ultra-specific skills in an elegant bulleted list. Each skill should explain exactly *how* it delivers business/organizational impact.

        # 💼 ACCELERATED IMPACT LOG
        Provide a chronological breakdown of experience with metrics. Reframe raw work into achievements (e.g. 'boosted efficiency by x%', 'engineered x standard').

        # 🎓 ACADEMICS & RECOGNITIONS
        List key credentials, institutions, graduation marks or certifications relevant.

        # ✉️ ELITE TARGETED COVER LETTER
        Compose a short (3 paragraphs), razor-sharp cover letter opening with high intent, addressing why this candidate is the perfect immediate asset for the position.
      `;
    } else if (service === "social") {
      prompt = `
        Formulate a 10-post social media high-engagement pack.
        
        Business Name: ${details.businessName || "N/A"}
        Niche/Industry: ${details.industry || "N/A"}
        Offerings: ${details.offerings || "N/A"}
        Brand Voice/Tone: ${details.tone || "N/A"}
        Campaign/Theme: ${details.campaignTheme || "N/A"}

        Format your response with the following structured layout in Markdown:

        # 🎯 CAMPAIGN NORTH STAR STRATEGY
        Define the strategic objective for this 10-post series, the psychological trigger being pressed, and target audience segments in Pretoria/South Africa.

        # 📱 THE 10-POST HIGH-ENGAGEMENT BLUEPRINT
        Provide exactly 10 comprehensive post outlines. Repeat the following block schema for each post (Post 1 to Post 10):
        
        ### [POST ID] Hook & Core Goal
        - **Objective**: What is the singular action or thought we want the reader to experience?
        - **Visual Prompt**: Suggest a thumb-stopping visual/video style aligned with brand tone.
        - **Sizzling Caption**: Write a high-stakes, scroll-stopping draft caption starting with a strong hook, structured body with benefits, and clear Call-To-Action.
        - **Strategic Tags/Hashtags**: Provide 5 highly researched South African & global tags tailored to the niche.

        # 📈 ENGAGEMENT & CONVERSION METRICS
        List 3 tactical steps the business can take on WhatsApp & social channels to convert comments/replies into buyers immediately.
      `;
    } else if (service === "business") {
      prompt = `
        Generate a masterfully crafted 1-Page Business Plan Canvas.
        
        Venture Name: ${details.ventureName || "N/A"}
        Concept Description: ${details.description || "N/A"}
        Target Market: ${details.market || "N/A"}
        Revenue Mechanics/Pricing: ${details.revenue || "N/A"}
        Unfair Advantage: ${details.advantage || "N/A"}
        Immediate Milestones: ${details.milestones || "N/A"}

        Format your response cleanly in Markdown with the following exact structural blocks:

        # 🎯 THE ELEVATOR PITCH
        A single sentence defining the venture, its core problem, the solution, and target market in South Africa. Make it compelling and investor-ready.

        # 👥 SOUTH AFRICAN CONSUMER MATRIX
        Break down the primary and secondary target audience segments. Detail their specific frustrations and why current market offerings in Gauteng are failing them.

        # 💰 FINANCIAL MECHANICS & PRICING POWER
        How this venture captures value. List pricing points in South African Rands (ZAR), projected unit economics, and estimated starting runway requirements.

        # 🛡️ THE UNFAIR ADVANTAGE / MOAT
        Explain why this venture is defensible from competitors. Is it speed, proprietary methodology, hyper-local Pretoria focus, or unique pricing?

        # 🏁 90-DAY DEPLOYMENT MILESTONES
        Provide a 3-part tactical roadmap (30-day, 60-day, 90-day targets) to launch this venture into the market and capture first client receipts.
      `;
    } else { // essay
      prompt = `
        Construct a master Structured Essay Outline to guide a high-scoring academic or corporate presentation.
        
        Topic/Prompt: ${details.topic || "N/A"}
        Academic Level/Objective: ${details.academicLevel || "N/A"}
        Core Arguments: ${details.arguments || "N/A"}
        Sources/Citations: ${details.sources || "N/A"}
        Target Thesis Goals: ${details.thesisGoals || "N/A"}

        Format your response with the following structured layout in Markdown:

        # 🏛️ PROPOSED ACADEMIC THESIS STATEMENT
        Formulate a pristine, rigorous thesis statement that resolves the essay question directly with sophistication.

        # 🗺️ ARCHITECTURAL MAP OF ARGUMENTS
        A breakdown table or list of how the essay is paced chronologically.

        # 📝 COMPREHENSIVE OUTLINE CHANNELS
        Provide a itemized breakdown of the outline with specific directions:
        
        ### Section A: High-Intent Introduction
        - **The Hook Idea**: A strong introductory angle to captivate the grader.
        - **Context Bounds**: Necessary background info.
        - **Thesis Bridge**: How the intro links directly to the thesis.

        ### Section B: Core Analytical Paragraphs (Body)
        For each argument (${details.arguments || "Main arguments"}), specify:
        - **Analytical Claim**: The distinct point being proved.
        - **Evidence Synthesis**: Recommended citations from ${details.sources || "sources"} or logical reasoning.
        - **Critical Commentary**: Micro-analysis of *why* the evidence proves the claim.
        - **Cohesive Transition**: High-flow segue into the next section.

        ### Section C: Resolution & Outlook
        - **Synthesis**: Pulling the arguments back into a larger realization.
        - **The So What? Factor**: Broadening the impact of this study for academia/business.

        # 📚 STRATEGIC RECOMMENDATIONS & CHEATSHEET
        List 3 common pitfalls to avoid for the target level: ${details.academicLevel}.
      `;
    }

    try {
      const gAI = getGeminiClient();
      const model = "gemini-3.5-flash";

      const completion = await gAI.models.generateContent({
        model,
        contents: prompt,
        config: {
          systemInstruction,
          temperature: 0.75,
        }
      });

      const responseText = completion.text || "No response received from Gemini.";
      
      // Dispatch draft via automated Pretoria email channel
      const emailStatus = await sendDraftEmail(service, details, responseText);
      
      res.json({ draftContent: responseText, emailStatus });

    } catch (apiError: any) {
      console.warn("Gemini API Client failed or is not configured:", apiError.message);
      
      // Beautiful local fallback for users without configured API keys:
      // This makes the app experience fully functional and educational even in pre-configured envs!
      const fallbackTemplates: Record<string, string> = {
        cv: `# 👑 PROFESSIONAL STANDING PROFILE\n[Fallback Preview - API Key Not Configured]\nElite and result-driven specialist targeted at the ${details.role || "Target"} position. Leverages deep expertise to streamline operations and create measurable commercial growth.\n\n# 🚀 CORE STRATEGIC COMPETENCIES\n- Advanced problem solving and strategy execution.\n- Core communications and cross-functional leadership.\n- Skills: ${details.skills || "Add key skills above to customize"}\n\n# 💼 ACCELERATED IMPACT LOG\n- Current / Prior Role: Engineered custom workflows resulting in significant delivery acceleration.\n- Experience highlights: ${details.experience || "Add your achievements to see them formatted"}\n\n# 🎓 ACADEMICS & RECOGNITIONS\n- ${details.academics || "Relevant certificates or degrees"}\n\n# ✉️ ELITE TARGETED COVER LETTER\nDear Hiring Partner,\n\nI am reaching out to present my credentials for the ${details.role || "Target"} position at your organization. Having refined my portfolio with specific strengths in ${details.skills || "the core areas"}, I am prepared to deliver immediate impact.\n\nMy experience in ${details.experience || "high-value initiatives"} has consistently demonstrated my drive for results. I look forward to finalizing this delivery with GP Studio Pretoria's full document engineering service.\n\nSincerely,\n${details.name || "A Valued Pretoria Client"}`,
        social: `# 🎯 CAMPAIGN NORTH STAR STRATEGY\n[Fallback Preview - API Key Not Configured]\nStrategic campaign direction for ${details.businessName || "Your business"}. Focused on high-engagement CRO messaging for the South African consumer base.\n\n# 📱 THE 10-POST HIGH-ENGAGEMENT BLUEPRINT\n### POST 1: Hook & Core Goal\n- **Objective**: Establish trust and highlight immediate value of ${details.offerings || "your products"}.\n- **Visual Prompt**: A minimal dark visual with vibrant emerald overlays showing real people.\n- **Sizzling Caption**: "Stop doing it the hard way. ${details.campaignTheme || "Our campaign banner"} is here to refine the standard. Tap the link to get yours in 2 hours!"\n- **Strategic Tags**: #Pretoria #GautengBusiness #GPStudio #SouthAfrica #EliteFormatting\n\n[Posts 2 to 10 will be generated perfectly using @google/genai once your GEMINI_API_KEY is active! Click below to send this data to WhatsApp support to generate manually for you.]\n\n# 📈 ENGAGEMENT & CONVERSION METRICS\n1. Always reply to comments within 12 minutes with a specific WhatsApp link.\n2. Pin a testimonial post highlighting your R200 Same-Day value.`,
        business: `# 🎯 THE ELEVATOR PITCH\n[Fallback Preview - API Key Not Configured]\n${details.ventureName || "The Venture"} is a high-growth initiative targeting the market of ${details.market || "South Africa"}. It solves core user issues with an unfair advantage in presentation and speed.\n\n# 👥 SOUTH AFRICAN CONSUMER MATRIX\n- **Target Market**: South African consumers who value instant, elite speed.\n- **Underlying Pain Point**: Existing solutions are too slow, overly dense, and suffer from poor visual layout.\n\n# 💰 FINANCIAL MECHANICS & PRICING POWER\n- **Mechanic**: ${details.revenue || "Flat service packaging starting from R250"}\n- **Pricing Moat**: High volume, same-day delivery with premium Gauteng-wide reach.\n\n# 🛡️ THE UNFAIR ADVANTAGE / MOAT\n- Defensible through extreme custom speed and GP Studio's established delivery matrix: ${details.advantage || "customized layout assets"}.\n\n# 🏁 90-DAY DEPLOYMENT MILESTONES\n- **30 Days**: Launch MVP template, capture first 15 paying Pretoria clients.\n- **60 Days**: Automate draft pipelines; establish direct WhatsApp referral hub.\n- **90 Days**: Expand to Johannesburg, secure institutional layout partnerships.`,
        essay: `# 🏛️ PROPOSED ACADEMIC THESIS STATEMENT\n[Fallback Preview - API Key Not Configured]\nEvaluating the topic "${details.topic || "Chosen Subject"}" reveals that a rigorous structure is crucial for conveying academic ideas effectively.\n\n# 🗺️ ARCHITECTURAL MAP OF ARGUMENTS\n1. Introduction to topic bounds: ${details.topic || "Subject topic"}\n2. Core Analytical Claim: ${details.arguments || "Individual analytical claims"}\n3. Counter-Evidence synthesis\n4. Synthesis & forward-looking summary\n\n# 📝 COMPREHENSIVE OUTLINE CHANNELS\n### Section A: High-Intent Introduction\n- **The Hook Idea**: Highlight why ${details.topic || "this topic"} matters today.\n- **Thesis Bridge**: Segue directly to: ${details.thesisGoals || "academic goals"}.\n\n### Section B: Core Analytical Paragraphs (Body)\n- **Analytical Claim**: Logical decomposition of ${details.arguments || "key arguments"}.\n- **Evidence Synthesis**: Synthesis of major studies from ${details.sources || "your sources"}.\n\n# 📚 STRATEGIC RECOMMENDATIONS & CHEATSHEET\n- Always ensure arguments flow logically using clear signposting vocabulary.\n- Double-check your citations against South African academic formatting rules.`
      };

      const fallbackText = fallbackTemplates[service] || fallbackTemplates.cv;
      
      // Dispatch draft fallback via automated Pretoria email channel
      const emailStatusFallback = await sendDraftEmail(service, details, fallbackText);
      
      res.json({ 
        draftContent: fallbackText,
        isDemoMode: true,
        message: "Demo Mode Active: Set your GEMINI_API_KEY inside Settings > Secrets to enable live, unique AI drafting with Pretoria high-stakes copywriting models.",
        emailStatus: emailStatusFallback
      });
    }

  } catch (err: any) {
    console.error("General Error in /api/generate-draft", err);
    res.status(500).json({ error: "Internal Server Error during formatting synthesis.", details: err.message });
  }
});

// Setup Vite Development middleware or static built assets for production
async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
    console.log("Started Express Server in DEVELOPMENT mode with Vite Middleware.");
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
    console.log("Started Express Server in PRODUCTION mode serving static files from /dist.");
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`GP Studio server actively listening on http://0.0.0.0:${PORT}`);
  });
}

startServer();
