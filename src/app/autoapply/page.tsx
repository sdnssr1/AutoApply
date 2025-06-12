"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Upload, FileText, Target, Download, Zap } from "lucide-react";
import ClientNavbar from "@/components/client-navbar";

export default function AutoApplyTool() {
  const [jobDescription, setJobDescription] = useState("");
  const [jobUrl, setJobUrl] = useState("");
  const [resumeFile, setResumeFile] = useState<File | null>(null);
  const [fitScore, setFitScore] = useState<number | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [tailoredResume, setTailoredResume] = useState("");

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setResumeFile(file);
    }
  };

  const handleAnalyze = async () => {
    if (!jobDescription && !jobUrl) {
      alert("Please provide either a job description or job URL");
      return;
    }
    if (!resumeFile) {
      alert("Please upload your résumé");
      return;
    }

    setIsProcessing(true);

    // Simulate AI processing
    setTimeout(() => {
      const mockScore = Math.floor(Math.random() * 30) + 70; // 70-100 range
      setFitScore(mockScore);
      setTailoredResume(
        "Your tailored résumé has been generated with optimized keywords and formatting.",
      );
      setIsProcessing(false);
    }, 3000);
  };

  const getFitScoreColor = (score: number) => {
    if (score >= 90) return "bg-green-500";
    if (score >= 80) return "bg-blue-500";
    if (score >= 70) return "bg-yellow-500";
    return "bg-red-500";
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <ClientNavbar />

      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-4">
            AutoApply: AI-Powered Résumé Tailoring
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Upload your résumé and job description to get an AI-tailored
            application with compatibility scoring.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {/* Left Panel - Job Input */}
          <Card className="bg-white">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="w-5 h-5 text-blue-600" />
                Job Description
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">
                  Job URL (Optional)
                </label>
                <input
                  type="url"
                  placeholder="https://company.com/job-posting"
                  value={jobUrl}
                  onChange={(e) => setJobUrl(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="text-center text-gray-500 text-sm">OR</div>

              <div>
                <label className="block text-sm font-medium mb-2">
                  Paste Job Description
                </label>
                <Textarea
                  placeholder="Paste the complete job description here..."
                  value={jobDescription}
                  onChange={(e) => setJobDescription(e.target.value)}
                  className="min-h-[200px] resize-none"
                />
              </div>
            </CardContent>
          </Card>

          {/* Right Panel - Resume Upload */}
          <Card className="bg-white">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="w-5 h-5 text-green-600" />
                Your Résumé
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-blue-400 transition-colors">
                <input
                  type="file"
                  accept=".pdf,.doc,.docx"
                  onChange={handleFileUpload}
                  className="hidden"
                  id="resume-upload"
                />
                <label htmlFor="resume-upload" className="cursor-pointer">
                  <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-lg font-medium mb-2">
                    {resumeFile ? resumeFile.name : "Drop your résumé here"}
                  </p>
                  <p className="text-sm text-gray-500">
                    {resumeFile
                      ? "File uploaded successfully"
                      : "or click to browse (PDF, DOC, DOCX)"}
                  </p>
                </label>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Analyze Button */}
        <div className="text-center mt-8">
          <Button
            onClick={handleAnalyze}
            disabled={
              isProcessing || (!jobDescription && !jobUrl) || !resumeFile
            }
            className="px-8 py-3 text-lg"
          >
            {isProcessing ? (
              <>
                <Zap className="w-5 h-5 mr-2 animate-spin" />
                Analyzing...
              </>
            ) : (
              <>
                <Zap className="w-5 h-5 mr-2" />
                Analyze & Tailor
              </>
            )}
          </Button>
        </div>

        {/* Results Section */}
        {fitScore !== null && (
          <div className="mt-12 max-w-4xl mx-auto">
            <Card className="bg-white">
              <CardHeader>
                <CardTitle className="text-center">Your Results</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Fit Score */}
                <div className="text-center">
                  <div className="inline-flex items-center gap-4">
                    <span className="text-lg font-medium">
                      Compatibility Score:
                    </span>
                    <Badge
                      className={`${getFitScoreColor(fitScore)} text-white text-xl px-4 py-2`}
                    >
                      {fitScore}/100
                    </Badge>
                  </div>
                  <p className="text-sm text-gray-600 mt-2">
                    {fitScore >= 90
                      ? "Excellent match! Your profile aligns perfectly with this role."
                      : fitScore >= 80
                        ? "Great match! You have most of the required skills."
                        : fitScore >= 70
                          ? "Good match! Consider highlighting relevant experience."
                          : "Fair match. Focus on transferable skills and relevant experience."}
                  </p>
                </div>

                {/* Tailored Resume Preview */}
                <div className="border rounded-lg p-6 bg-gray-50">
                  <h3 className="font-semibold mb-3">
                    Tailored Résumé Preview
                  </h3>
                  <p className="text-gray-700 mb-4">{tailoredResume}</p>
                  <div className="text-sm text-gray-600">
                    <p>✓ Keywords optimized for ATS systems</p>
                    <p>✓ Skills section enhanced with job-relevant terms</p>
                    <p>
                      ✓ Experience descriptions tailored to match requirements
                    </p>
                  </div>
                </div>

                {/* Download Button */}
                <div className="text-center">
                  <Button className="px-6 py-3">
                    <Download className="w-5 h-5 mr-2" />
                    Download Tailored Résumé
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
}
