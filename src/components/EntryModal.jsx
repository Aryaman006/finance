'use client';

import { useState } from "react";
import EntryForm from "./EntryForm";
import { motion, AnimatePresence } from "framer-motion";

export default function EntryModal({ onAdd }) {
  const [isOpen, setIsOpen] = useState(false);

  const handleAdd = (entry) => {
    onAdd(entry);
    setIsOpen(false); 
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-5 py-2.5 rounded-lg shadow-md transition duration-200"
      >
        + Add Entry
      </button>

      <AnimatePresence>
        {isOpen && (
          <>
            {/* Overlay */}
            <motion.div
              className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            />

            {/* Modal */}
            <motion.div
              className="fixed inset-0 z-50 flex items-center justify-center p-4"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.2, ease: "easeInOut" }}
            >
              <div className="relative bg-white w-full max-w-xl rounded-2xl p-6 shadow-xl border border-gray-200">
                {/* Close Button */}
                <button
                  onClick={() => setIsOpen(false)}
                  className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition text-xl"
                  aria-label="Close"
                >
                  &times;
                </button>

                {/* Form Content */}
                <EntryForm onAdd={handleAdd} />
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
