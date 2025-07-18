import React from "react";
import { FiAlertCircle, FiCheckCircle, FiInfo, FiX } from "react-icons/fi";

const ConfirmationDialog = ({
  isOpen,
  onClose,
  onConfirm,
  title = "Confirmation",
  message = "Êtes-vous sûr de vouloir effectuer cette action ?",
  confirmText = "Confirmer",
  cancelText = "Annuler",
  type = "warning", // 'warning' | 'danger' | 'info' | 'success'
}) => {
  if (!isOpen) return null;

  // Configuration des icônes et couleurs par type
  const typeConfig = {
    warning: {
      icon: <FiAlertCircle className="text-yellow-500" size={24} />,
      bgColor: "bg-yellow-100",
      textColor: "text-yellow-800",
      buttonColor: "bg-yellow-500 hover:bg-yellow-600",
    },
    danger: {
      icon: <FiAlertCircle className="text-red-500" size={24} />,
      bgColor: "bg-red-100",
      textColor: "text-red-800",
      buttonColor: "bg-red-500 hover:bg-red-600",
    },
    info: {
      icon: <FiInfo className="text-blue-500" size={24} />,
      bgColor: "bg-blue-100",
      textColor: "text-blue-800",
      buttonColor: "bg-blue-500 hover:bg-blue-600",
    },
    success: {
      icon: <FiCheckCircle className="text-green-500" size={24} />,
      bgColor: "bg-green-100",
      textColor: "text-green-800",
      buttonColor: "bg-green-500 hover:bg-green-600",
    },
  };

  const currentType = typeConfig[type] || typeConfig.warning;

  return (
    <div className="fixed inset-0 z-1100 overflow-y-auto">
      <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        {/* Overlay */}
        <div className="fixed inset-0 transition-opacity" aria-hidden="true">
          <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
        </div>

        {/* Modal */}
        <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
          <div className={`px-4 pt-5 pb-4 sm:p-6 sm:pb-4 ${currentType.bgColor}`}>
            <div className="sm:flex sm:items-start">
              <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full sm:mx-0 sm:h-10 sm:w-10">
                {currentType.icon}
              </div>
              <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                <h3
                  className={`text-lg leading-6 font-medium ${currentType.textColor}`}
                >
                  {title}
                </h3>
                <div className="mt-2">
                  <p className="text-sm text-gray-500">{message}</p>
                </div>
              </div>
              <button
                onClick={onClose}
                className="absolute top-4 right-4 text-gray-400 hover:text-gray-500"
              >
                <FiX size={20} />
              </button>
            </div>
          </div>
          <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
            <button
              type="button"
              onClick={() => {
                onConfirm();
                onClose();
              }}
              className={`w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 text-white text-base font-medium focus:outline-none sm:ml-3 sm:w-auto sm:text-sm ${currentType.buttonColor}`}
            >
              {confirmText}
            </button>
            <button
              type="button"
              onClick={onClose}
              className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
            >
              {cancelText}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationDialog;