import React, { useEffect, useState } from "react";
import Button from "../common/Button";
import useAuthStore from "../../store/useAuthStore";
import { useUserProfileStore } from "../../store/useUserProfileStore";
import useBillingStore from "../../store/useBillingStore";

export default function DashboardPage() {
  const { user, isAuthenticated } = useAuthStore();
  const {
    profile,
    isLoading,
    isSaving,
    error,
    hasProfile,
    fetchOwnerProfile,
    createProfile,
    updateProfile,
    clearError,
  } = useUserProfileStore();

  const { billingState, fetchCurrentBilling } = useBillingStore();

  // Local states
  const [inputContent, setInputContent] = useState("");
  const [isPublishedInput, setIsPublishedInput] = useState(true);
  const [isEditingMarkdown, setIsEditingMarkdown] = useState(false);
  const [editedMarkdownContent, setEditedMarkdownContent] = useState("");
  const [aiToneInput, setAiToneInput] = useState("");
  const [isEditingTone, setIsEditingTone] = useState(false);
  const [newQuestionInput, setNewQuestionInput] = useState("");
  const [isAddingQuestion, setIsAddingQuestion] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  useEffect(() => {
    if (isAuthenticated) {
      fetchOwnerProfile();
      fetchCurrentBilling();
    }
  }, [isAuthenticated, fetchOwnerProfile, fetchCurrentBilling]);

  useEffect(() => {
    if (profile?.content) {
      setEditedMarkdownContent(profile.content);
    }
    if (profile?.aiTone !== undefined) {
      setAiToneInput(profile.aiTone);
    }
  }, [profile?.content, profile?.aiTone]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleCreateProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputContent.trim()) return;

    const success = await createProfile({
      content: inputContent.trim(),
      isPublished: isPublishedInput,
      aiTone: aiToneInput.trim(),
    });
    if (success) {
      setInputContent("");
      showToast("Profile created successfully!");
    }
  };

  const handleSaveMarkdownEdit = async () => {
    if (!editedMarkdownContent.trim()) return;

    const success = await updateProfile({
      content: editedMarkdownContent.trim(),
    });
    if (success) {
      setIsEditingMarkdown(false);
      showToast("Profile content updated successfully!");
    }
  };

  const handleSaveAiTone = async () => {
    const success = await updateProfile({
      aiTone: aiToneInput.trim(),
    });
    if (success) {
      setIsEditingTone(false);
      showToast("Custom AI tone updated successfully!");
    }
  };

  const handleTogglePublish = async (targetStatus?: boolean) => {
    if (!profile) return;
    const newStatus =
      targetStatus !== undefined ? targetStatus : !profile.isPublished;
    const success = await updateProfile({ isPublished: newStatus });
    if (success) {
      showToast(
        `Profile visibility set to ${newStatus ? "Public" : "Private"}`,
      );
    }
  };

  const handleAddQuestion = async () => {
    if (!profile || !newQuestionInput.trim()) return;
    if (profile.suggestedQuestions.length >= 5) {
      alert("Maximum 5 suggested questions allowed.");
      return;
    }
    const updated = [...profile.suggestedQuestions, newQuestionInput.trim()];
    const success = await updateProfile({ suggestedQuestions: updated });
    if (success) {
      setNewQuestionInput("");
      setIsAddingQuestion(false);
      showToast("Question added!");
    }
  };

  const handleRemoveQuestion = async (indexToRemove: number) => {
    if (!profile) return;
    const updated = profile.suggestedQuestions.filter(
      (_, idx) => idx !== indexToRemove,
    );
    const success = await updateProfile({ suggestedQuestions: updated });
    if (success) {
      showToast("Question removed!");
    }
  };

  const handleCopyLink = () => {
    if (!profile?.username) return;
    const publicUrl = `${window.location.origin}/in/${profile.username}`;
    navigator.clipboard.writeText(publicUrl);
    setCopiedLink(true);
    showToast("Public profile link copied to clipboard!");
    setTimeout(() => setCopiedLink(false), 2500);
  };

  const isToneActive = billingState?.entitlements?.features?.aiTone === true;

  // Basic Helper to render formatted Markdown text preview cleanly
  const renderSimpleMarkdown = (text: string) => {
    if (!text) return null;
    const lines = text.split("\n");
    return lines.map((line, i) => {
      if (line.startsWith("# ")) {
        return (
          <h1
            key={i}
            className="text-2xl sm:text-3xl font-extrabold text-text-primary mt-4 mb-2 font-outfit"
          >
            {line.replace("# ", "")}
          </h1>
        );
      }
      if (line.startsWith("## ")) {
        return (
          <h2
            key={i}
            className="text-xl sm:text-2xl font-bold text-text-primary mt-4 mb-2 font-outfit"
          >
            {line.replace("## ", "")}
          </h2>
        );
      }
      if (line.startsWith("### ")) {
        return (
          <h3
            key={i}
            className="text-lg font-semibold text-text-primary mt-3 mb-1 font-outfit"
          >
            {line.replace("### ", "")}
          </h3>
        );
      }
      if (line.startsWith("- ") || line.startsWith("* ")) {
        return (
          <li key={i} className="ml-5 list-disc text-text-secondary my-1">
            {line.substring(2)}
          </li>
        );
      }
      if (line.trim() === "") {
        return <div key={i} className="h-2" />;
      }
      return (
        <p key={i} className="text-text-secondary leading-relaxed my-1">
          {line}
        </p>
      );
    });
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Dashboard Page Header */}
      <div className="space-y-1">
        <h1 className="text-2xl sm:text-3xl font-bold text-text-primary font-outfit">
          Your Meknos Profile
        </h1>
        <p className="text-sm text-text-secondary">
          Manage what visitors see, custom AI tone, and conversation starters.
        </p>
      </div>

      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-bg-inverse text-text-inverse px-5 py-3 rounded-2xl shadow-2xl text-sm font-medium flex items-center gap-2 animate-in fade-in slide-in-from-bottom-4">
          <svg
            className="w-5 h-5 text-emerald-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 13l4 4L19 7"
            />
          </svg>
          {toastMessage}
        </div>
      )}

      {/* Error Alert */}
      {error && (
        <div className="p-4 rounded-2xl bg-red-500/10 border border-red-500/20 text-red-600 text-sm flex items-center justify-between">
          <span>{error}</span>
          <button
            onClick={clearError}
            className="font-bold text-red-500 hover:text-red-700 ml-2 cursor-pointer"
          >
            ✕
          </button>
        </div>
      )}

      {/* User Profile Header Card */}
      <div className="bg-bg-secondary border border-border-primary rounded-3xl p-6 sm:p-8 shadow-sm backdrop-blur-md">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          {/* User Info */}
          <div className="flex items-center gap-4">
            {user?.profileUrl ? (
              <img
                src={user.profileUrl}
                alt={user.fullName}
                className="w-16 h-16 sm:w-20 sm:h-20 rounded-full border-2 border-text-primary object-cover shadow-sm flex-shrink-0"
              />
            ) : (
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-text-primary text-text-inverse flex items-center justify-center text-2xl font-bold flex-shrink-0">
                {user?.fullName?.charAt(0).toUpperCase() || "U"}
              </div>
            )}
            <div className="space-y-1">
              <div className="flex items-center gap-2 flex-wrap">
                <h2 className="text-xl sm:text-2xl font-extrabold text-text-primary tracking-tight font-outfit">
                  {user?.fullName}
                </h2>
                {profile?.username && (
                  <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-black/5 text-text-secondary">
                    {profile.username}
                  </span>
                )}
              </div>
              <p className="text-sm text-text-secondary">{user?.email}</p>

              {/* Profile Visibility Status Indicator */}
              <div className="flex items-center gap-2 pt-1">
                {hasProfile && profile ? (
                  <>
                    <span
                      className={`h-2 w-2 rounded-full ${
                        profile.isPublished ? "bg-emerald-500" : "bg-amber-500"
                      }`}
                    />
                    <span className="text-xs font-semibold text-text-secondary">
                      {profile.isPublished
                        ? "Public profile"
                        : "Private profile"}
                    </span>
                  </>
                ) : (
                  <>
                    <span className="h-2 w-2 rounded-full bg-gray-400" />
                    <span className="text-xs font-semibold text-text-secondary">
                      Not created
                    </span>
                  </>
                )}
              </div>
            </div>
          </div>

          {/* Profile Action Buttons */}
          {hasProfile && profile && (
            <div className="flex flex-col sm:flex-row items-center gap-3 w-full sm:w-auto">
              <Button
                variant="secondary"
                size="sm"
                onClick={() => handleTogglePublish()}
                disabled={isSaving}
                className="w-full sm:w-auto"
              >
                {profile.isPublished ? "Switch to Private" : "Make Public"}
              </Button>
              <Button
                variant="primary"
                size="sm"
                onClick={handleCopyLink}
                className="w-full sm:w-auto"
              >
                {copiedLink ? "Copied!" : "Share Profile"}
              </Button>
            </div>
          )}
        </div>
      </div>

      {/* Profile Content & Editor */}
      {isLoading ? (
        <div className="p-12 text-center bg-bg-secondary border border-border-primary rounded-3xl">
          <div className="inline-block animate-spin w-8 h-8 border-4 border-border-primary border-t-text-primary rounded-full mb-3" />
          <p className="text-sm font-medium text-text-secondary">
            Loading profile data...
          </p>
        </div>
      ) : hasProfile && profile ? (
        <div className="bg-bg-secondary border border-border-primary rounded-3xl p-6 sm:p-8 shadow-sm space-y-6">
          <div className="flex items-center justify-between border-b border-border-primary pb-4">
            <div>
              <h2 className="text-xl font-bold text-text-primary font-outfit">
                Profile Knowledge Base
              </h2>
              <p className="text-xs text-text-secondary mt-0.5">
                This structured information is used by Meknos AI to answer
                visitor questions.
              </p>
            </div>
            <Button
              variant={isEditingMarkdown ? "secondary" : "ghost"}
              size="sm"
              onClick={() => {
                if (isEditingMarkdown) {
                  setEditedMarkdownContent(profile.content);
                }
                setIsEditingMarkdown(!isEditingMarkdown);
              }}
            >
              {isEditingMarkdown ? "Cancel" : "Edit"}
            </Button>
          </div>

          {isEditingMarkdown ? (
            <div className="space-y-4">
              <textarea
                rows={14}
                value={editedMarkdownContent}
                onChange={(e) => setEditedMarkdownContent(e.target.value)}
                className="w-full p-4 rounded-2xl bg-bg-primary border border-border-primary font-mono text-sm text-text-primary focus:outline-none focus:ring-2 focus:ring-black/20 leading-relaxed"
                placeholder="Edit your profile content..."
              />
              <div className="flex justify-end gap-3">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => {
                    setEditedMarkdownContent(profile.content);
                    setIsEditingMarkdown(false);
                  }}
                >
                  Discard
                </Button>
                <Button
                  variant="primary"
                  size="sm"
                  onClick={handleSaveMarkdownEdit}
                  disabled={isSaving}
                >
                  {isSaving ? "Saving..." : "Save Changes"}
                </Button>
              </div>
            </div>
          ) : (
            <div className="p-6 rounded-2xl bg-bg-primary border border-border-primary space-y-3 font-sans">
              {renderSimpleMarkdown(profile.content)}
            </div>
          )}
        </div>
      ) : null}

      {/* Custom AI Tone Section */}
      {hasProfile && profile && (
        <div className="bg-bg-secondary border border-border-primary rounded-3xl p-6 sm:p-8 shadow-sm space-y-6">
          <div className="flex items-center justify-between border-b border-border-primary pb-4">
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-xl font-bold text-text-primary font-outfit">
                  Custom AI Response Tone
                </h2>
                <span
                  className={`px-2.5 py-0.5 text-[10px] font-extrabold uppercase rounded-full ${
                    isToneActive
                      ? "bg-emerald-500/20 text-emerald-700 border border-emerald-500/30"
                      : "bg-amber-500/20 text-amber-700 border border-amber-500/30"
                  }`}
                >
                  {isToneActive ? "PRO ACTIVE" : "PRO FEATURE (LOCKED)"}
                </span>
              </div>
              <p className="text-xs text-text-secondary mt-0.5">
                Set custom instructions for how your AI assistant should sound
                when talking to visitors.
              </p>
            </div>
            <Button
              variant={isEditingTone ? "secondary" : "ghost"}
              size="sm"
              onClick={() => {
                if (isEditingTone) {
                  setAiToneInput(profile.aiTone || "");
                }
                setIsEditingTone(!isEditingTone);
              }}
            >
              {isEditingTone ? "Cancel" : "Edit Tone"}
            </Button>
          </div>

          {!isToneActive && (
            <div className="p-3.5 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-amber-800 text-xs leading-relaxed">
              Upgrade to Pro to activate it for visitor chats.
            </div>
          )}

          {isEditingTone ? (
            <div className="space-y-4">
              <textarea
                rows={3}
                value={aiToneInput}
                onChange={(e) => setAiToneInput(e.target.value)}
                placeholder="e.g. Friendly, concise, witty, highly professional, and encouraging..."
                className="w-full p-4 rounded-2xl bg-bg-primary border border-border-primary text-sm text-text-primary focus:outline-none focus:ring-2 focus:ring-black/20 leading-relaxed"
              />
              <div className="flex justify-end gap-3">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => {
                    setAiToneInput(profile.aiTone || "");
                    setIsEditingTone(false);
                  }}
                >
                  Discard
                </Button>
                <Button
                  variant="primary"
                  size="sm"
                  onClick={handleSaveAiTone}
                  disabled={isSaving}
                >
                  {isSaving ? "Saving..." : "Save Tone"}
                </Button>
              </div>
            </div>
          ) : (
            <div className="p-4 rounded-2xl bg-bg-primary border border-border-primary text-sm text-text-primary">
              {profile.aiTone && profile.aiTone.trim().length > 0 ? (
                <p className="italic">"{profile.aiTone}"</p>
              ) : (
                <p className="text-text-secondary text-xs italic">
                  No custom tone instructions set yet. Click Edit Tone to
                  configure.
                </p>
              )}
            </div>
          )}
        </div>
      )}

      {/* Conversation Starters */}
      {hasProfile && profile && (
        <div className="bg-bg-secondary border border-border-primary rounded-3xl p-6 sm:p-8 shadow-sm space-y-6">
          <div>
            <h2 className="text-xl font-bold text-text-primary font-outfit">
              Suggested Questions
            </h2>
            <p className="text-xs text-text-secondary mt-0.5">
              Give visitors ideas of what they can ask about you.
            </p>
          </div>

          <div className="space-y-3">
            {profile.suggestedQuestions &&
            profile.suggestedQuestions.length > 0 ? (
              profile.suggestedQuestions.map((q, idx) => (
                <div
                  key={idx}
                  className="flex items-center justify-between gap-4 p-3.5 rounded-2xl bg-bg-primary border border-border-primary text-sm text-text-primary"
                >
                  <span className="font-medium">"{q}"</span>
                  <button
                    onClick={() => handleRemoveQuestion(idx)}
                    className="text-xs text-text-secondary hover:text-red-500 font-semibold px-2 py-1 rounded-lg transition-colors cursor-pointer flex-shrink-0"
                  >
                    Remove
                  </button>
                </div>
              ))
            ) : (
              <p className="text-sm text-text-secondary italic">
                No conversation starters added yet.
              </p>
            )}
          </div>

          {profile.suggestedQuestions.length < 5 && (
            <div>
              {isAddingQuestion ? (
                <div className="flex flex-col sm:flex-row gap-2 pt-2">
                  <input
                    type="text"
                    value={newQuestionInput}
                    onChange={(e) => setNewQuestionInput(e.target.value)}
                    placeholder="e.g. What does Amit specialize in?"
                    className="flex-1 px-4 py-2 rounded-full bg-bg-primary border border-border-primary text-sm text-text-primary focus:outline-none focus:ring-2 focus:ring-black/20"
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault();
                        handleAddQuestion();
                      }
                    }}
                  />
                  <div className="flex items-center gap-2">
                    <Button
                      variant="primary"
                      size="sm"
                      onClick={handleAddQuestion}
                      disabled={isSaving || !newQuestionInput.trim()}
                    >
                      Add Question
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => {
                        setIsAddingQuestion(false);
                        setNewQuestionInput("");
                      }}
                    >
                      Cancel
                    </Button>
                  </div>
                </div>
              ) : (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsAddingQuestion(true)}
                  className="text-text-secondary hover:text-text-primary"
                >
                  + Add question
                </Button>
              )}
            </div>
          )}
        </div>
      )}

      {/* Create Profile Content (Only rendered for new users without a profile) */}
      {(!hasProfile || !profile) && !isLoading && (
        <div className="bg-bg-secondary border border-border-primary rounded-3xl p-6 sm:p-8 shadow-sm space-y-6">
          <div>
            <h2 className="text-xl font-bold text-text-primary font-outfit">
              Create your profile
            </h2>
            <p className="text-sm text-text-secondary mt-1">
              Tell Meknos what you want visitors to know. We’ll turn it into a
              profile they can understand and ask questions about.
            </p>
          </div>

          <form onSubmit={handleCreateProfile} className="space-y-4">
            <textarea
              rows={6}
              value={inputContent}
              onChange={(e) => setInputContent(e.target.value)}
              placeholder="Tell us about your work, experience, projects, skills, links, or anything else you'd like people to know."
              className="w-full p-4 rounded-2xl bg-bg-primary border border-border-primary text-sm text-text-primary focus:outline-none focus:ring-2 focus:ring-black/20 leading-relaxed"
            />

            {/* Profile Visibility Option (Public vs Private) */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-4 rounded-2xl bg-bg-primary border border-border-primary">
              <div>
                <p className="text-sm font-bold text-text-primary">
                  Profile Visibility
                </p>
                <p className="text-xs text-text-secondary">
                  {isPublishedInput
                    ? "Public: Anyone with your profile link can view and chat with your AI agent."
                    : "Private: Profile is hidden from visitors until published."}
                </p>
              </div>
              <div className="flex items-center gap-4">
                <label className="flex items-center gap-2 cursor-pointer text-sm font-medium text-text-primary">
                  <input
                    type="radio"
                    name="profileVisibility"
                    checked={isPublishedInput}
                    onChange={() => setIsPublishedInput(true)}
                    className="w-4 h-4 text-emerald-600 accent-emerald-600 cursor-pointer"
                  />
                  🌐 Public
                </label>
                <label className="flex items-center gap-2 cursor-pointer text-sm font-medium text-text-primary">
                  <input
                    type="radio"
                    name="profileVisibility"
                    checked={!isPublishedInput}
                    onChange={() => setIsPublishedInput(false)}
                    className="w-4 h-4 text-amber-600 accent-amber-600 cursor-pointer"
                  />
                  🔒 Private
                </label>
              </div>
            </div>

            {/* Custom Tone Input for New Profile */}
            <div className="space-y-2">
              <label className="block text-sm font-bold text-text-primary">
                Custom AI Tone (Optional)
              </label>
              <input
                type="text"
                value={aiToneInput}
                onChange={(e) => setAiToneInput(e.target.value)}
                placeholder="e.g. Professional, friendly, and concise..."
                className="w-full px-4 py-2.5 rounded-2xl bg-bg-primary border border-border-primary text-sm text-text-primary focus:outline-none focus:ring-2 focus:ring-black/20"
              />
              {!isToneActive && (
                <div className="ml-4 text-amber-800 text-xs leading-relaxed">
                  Upgrade to Pro to activate it for visitor chats.
                </div>
              )}
            </div>

            <div className="flex items-center justify-end pt-2">
              <Button
                variant="primary"
                size="md"
                type="submit"
                disabled={isSaving || !inputContent.trim()}
                className="w-full sm:w-auto"
              >
                {isSaving ? "Creating..." : "Create Profile"}
              </Button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
