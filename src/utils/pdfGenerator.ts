/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { jsPDF } from "jspdf";
import { ResumeData } from "../types";

export function downloadResumePDF(data: ResumeData) {
  // Create an A4 Portrait PDF
  const doc = new jsPDF({
    orientation: "portrait",
    unit: "mm",
    format: "a4",
  });

  const pageHeight = 297; // A4 height in mm
  const pageWidth = 210;  // A4 width in mm
  const margin = 20;      // 20mm margins
  const contentWidth = pageWidth - margin * 2;

  let y = 15; // Current cursor position

  // Helper: Add page-check capability to prevent overflow
  function ensureSpace(needed: number) {
    if (y + needed > pageHeight - 15) {
      doc.addPage();
      y = 20; // reset y
    }
  }

  // --- 1. Header (Name, Title, Contact Info) ---
  doc.setFont("Times", "bold");
  doc.setFontSize(24);
  doc.setTextColor(0, 0, 0);
  doc.text(data.name, margin, y);
  y += 7;

  doc.setFont("Times", "italic");
  doc.setFontSize(11);
  doc.setTextColor(100, 100, 100);
  doc.text(data.title, margin, y);
  y += 5;

  doc.setFont("Times", "normal");
  doc.setFontSize(10);
  doc.setTextColor(0, 0, 0);

  const contactLine = `${data.phone}  |  ${data.email}  |  ${data.location}`;
  doc.text(contactLine, margin, y);
  y += 4.5;

  const linkLine = `${data.linkedin.replace("https://", "")}  |  ${data.github.replace("https://", "")}`;
  doc.setTextColor(51, 102, 204); // Blue color for links
  doc.text(linkLine, margin, y);
  doc.setTextColor(0, 0, 0);     // Reset
  y += 9;

  // Helper for drawing elegant section headers
  function renderSectionHeader(title: string) {
    ensureSpace(15);
    y += 2;
    doc.setFont("Times", "bold");
    doc.setFontSize(14);
    doc.setTextColor(26, 82, 118); // Dark Elegant Slate Blue
    doc.text(title, margin, y);
    y += 2;
    
    // Draw fine dividing line underneath
    doc.setDrawColor(200, 200, 200);
    doc.setLineWidth(0.24);
    doc.line(margin, y, pageWidth - margin, y);
    y += 5.5;
  }

  // --- Professional Summary ---
  renderSectionHeader("Professional Summary");
  doc.setFont("Times", "normal");
  doc.setFontSize(10.5);
  doc.setTextColor(50, 50, 50);

  const summaryLines = doc.splitTextToSize(data.summary, contentWidth);
  doc.text(summaryLines, margin, y);
  y += summaryLines.length * 5 + 4;

  // --- Education ---
  renderSectionHeader("Education");
  data.education.forEach((edu) => {
    ensureSpace(edu.keyCoursework.length > 0 ? 25 : 15);
    doc.setFont("Times", "bold");
    doc.setFontSize(11);
    doc.setTextColor(0, 0, 0);
    
    // Institution (Left) and Location (Right)
    doc.text(edu.institution, margin, y);
    doc.setFont("Times", "normal");
    doc.setFontSize(10);
    doc.text(edu.location, pageWidth - margin, y, { align: "right" });
    y += 4.5;

    // Degree & CGPA (Left) and Duration (Right)
    doc.setFont("Times", "italic");
    const degreeCgpa = edu.cgpa ? `${edu.degree} (${edu.cgpa})` : edu.degree;
    doc.text(degreeCgpa, margin, y);
    doc.setFont("Times", "normal");
    doc.text(edu.duration, pageWidth - margin, y, { align: "right" });
    y += 5.5;

    // Key Coursework
    if (edu.keyCoursework.length > 0) {
      doc.setFont("Times", "bold");
      doc.text("Key Coursework: ", margin + 2, y);
      const cwText = edu.keyCoursework.join(", ");
      doc.setFont("Times", "normal");
      const cwOffset = doc.getTextWidth("Key Coursework: ") + 3;
      const cwLines = doc.splitTextToSize(cwText, contentWidth - cwOffset);
      doc.text(cwLines, margin + cwOffset, y);
      y += cwLines.length * 5;
    }

    // Honors
    if (edu.honors.length > 0) {
      edu.honors.forEach((honor) => {
        ensureSpace(5);
        doc.text(`- ${honor}`, margin + 2, y);
        y += 4.5;
      });
    }
    y += 2;
  });

  // --- Work Experience ---
  renderSectionHeader("Work Experience");
  data.experience.forEach((exp) => {
    ensureSpace(20);
    doc.setFont("Times", "bold");
    doc.setFontSize(11);
    doc.setTextColor(0, 0, 0);

    // Role
    doc.text(exp.role, margin, y);
    // Duration
    doc.setFont("Times", "normal");
    doc.setFontSize(10);
    doc.text(exp.duration, pageWidth - margin, y, { align: "right" });
    y += 4.5;

    // Company & Remote Info
    doc.setFont("Times", "italic");
    const compText = exp.isRemote ? `${exp.company} (Remote)` : `${exp.company}`;
    doc.text(compText, margin, y);
    doc.setFont("Times", "normal");
    doc.text(exp.location, pageWidth - margin, y, { align: "right" });
    y += 5.5;

    // Highlights
    doc.setFont("Times", "normal");
    doc.setFontSize(10);
    exp.highlights.forEach((hl) => {
      const bulletText = `- ${hl}`;
      const bulletLines = doc.splitTextToSize(bulletText, contentWidth - 4);
      ensureSpace(bulletLines.length * 5);
      doc.text(bulletLines, margin + 2, y);
      y += bulletLines.length * 4.8;
    });
    y += 2.5;
  });

  // --- Technical Projects ---
  renderSectionHeader("Technical Projects");
  data.projects.forEach((proj) => {
    ensureSpace(20);
    doc.setFont("Times", "bold");
    doc.setFontSize(11);
    doc.setTextColor(0, 0, 0);

    // Title
    doc.text(proj.title, margin, y);
    // Technologies (Right)
    doc.setFont("Times", "italic");
    doc.setFontSize(9.5);
    doc.setTextColor(100, 100, 100);
    const techString = proj.technologies.join(", ");
    doc.text(techString, pageWidth - margin, y, { align: "right" });
    y += 5;

    // Highlights
    doc.setFont("Times", "normal");
    doc.setFontSize(10);
    doc.setTextColor(50, 50, 50);
    proj.highlights.forEach((hl) => {
      const bulletText = `- ${hl}`;
      const bulletLines = doc.splitTextToSize(bulletText, contentWidth - 4);
      ensureSpace(bulletLines.length * 5);
      doc.text(bulletLines, margin + 2, y);
      y += bulletLines.length * 4.8;
    });
    y += 2.5;
  });

  // --- Technical Skills ---
  renderSectionHeader("Technical Skills");
  data.skills.forEach((skillGroup) => {
    ensureSpace(6);
    doc.setFont("Times", "bold");
    doc.setFontSize(10.5);
    doc.setTextColor(0, 0, 0);
    const catLabel = `${skillGroup.category}: `;
    doc.text(catLabel, margin, y);
    
    doc.setFont("Times", "normal");
    const offset = doc.getTextWidth(catLabel) + 2;
    const skillList = skillGroup.skills.join(", ");
    const skillLines = doc.splitTextToSize(skillList, contentWidth - offset);
    doc.text(skillLines, margin + offset, y);
    y += skillLines.length * 5;
  });
  y += 2;

  // --- Leadership ---
  if (data.leadership && data.leadership.length > 0) {
    renderSectionHeader("Leadership & Activities");
    data.leadership.forEach((lead) => {
      ensureSpace(15);
      doc.setFont("Times", "bold");
      doc.setFontSize(11);
      doc.setTextColor(0, 0, 0);
      doc.text(lead.role, margin, y);
      doc.setFont("Times", "normal");
      doc.setFontSize(10);
      doc.text(lead.duration, pageWidth - margin, y, { align: "right" });
      y += 4.5;

      doc.setFont("Times", "italic");
      doc.text(`${lead.organization} (${lead.location})`, margin, y);
      y += 5.5;

      doc.setFont("Times", "normal");
      lead.details.forEach((det) => {
        const bulletText = `- ${det}`;
        const bulletLines = doc.splitTextToSize(bulletText, contentWidth - 4);
        ensureSpace(bulletLines.length * 5);
        doc.text(bulletLines, margin + 2, y);
        y += bulletLines.length * 4.8;
      });
      y += 2;
    });
  }

  // --- Certifications ---
  if (data.certifications && data.certifications.length > 0) {
    renderSectionHeader("Certifications");
    data.certifications.forEach((cert) => {
      ensureSpace(5);
      doc.setFont("Times", "normal");
      doc.setFontSize(10);
      const displayString = cert.issuer 
        ? `- ${cert.name} (${cert.issuer}, ${cert.year})`
        : `- ${cert.name} (${cert.year})`;
      doc.text(displayString, margin, y);
      y += 4.8;
    });
  }

  // Save PDF to file trigger
  doc.save(`${data.name.replace(/\s+/g, "_")}_Resume.pdf`);
}
