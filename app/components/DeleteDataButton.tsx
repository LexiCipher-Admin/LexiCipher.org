"use client";

import { useState } from "react";

export default function DeleteDataButton() {
  const [showConfirm, setShowConfirm] = useState(false);
  const [deleted, setDeleted] = useState(false);

  const handleDelete = () => {
    // Clear all localStorage data
    if (typeof window !== "undefined") {
      localStorage.clear();
      
      // Clear all sessionStorage data
      sessionStorage.clear();
      
      // Clear all cookies by setting them to expire in the past
      document.cookie.split(";").forEach((c) => {
        document.cookie = c
          .replace(/^ +/, "")
          .replace(/=.*/, "=;expires=" + new Date().toUTCString() + ";path=/");
      });
    }

    setDeleted(true);
    setShowConfirm(false);
  };

  if (deleted) {
    return (
      <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
        <p className="text-green-800 font-medium">✓ All your data has been deleted.</p>
        <p className="text-green-700 text-sm mt-1">
          Your session has been reset. You can close this page or start a new test.
        </p>
      </div>
    );
  }

  if (showConfirm) {
    return (
      <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
        <p className="text-red-800 font-medium mb-3">
          Are you sure you want to delete all your data?
        </p>
        <p className="text-red-700 text-sm mb-4">
          This will permanently delete all your test progress, preferences, and results from this browser. This action cannot be undone.
        </p>
        <div className="flex gap-3">
          <button
            onClick={handleDelete}
            className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-medium"
          >
            Yes, Delete My Data
          </button>
          <button
            onClick={() => setShowConfirm(false)}
            className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition-colors"
          >
            Cancel
          </button>
        </div>
      </div>
    );
  }

  return (
    <button
      onClick={() => setShowConfirm(true)}
      className="px-6 py-3 bg-red-100 text-red-700 border border-red-300 rounded-lg hover:bg-red-200 transition-colors font-medium"
    >
      🗑️ Delete My Data
    </button>
  );
}