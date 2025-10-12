export const handleApiError = (error: any) => {
  console.error("API Error:", error);

  const errorField = "unknown";
  let msg = "Something went wrong. Please try again.";
  
  if (error.response) {
    const { status } = error.response;
    if (status === 401) msg = "Session expired. Redirecting to login...";
    else if (status === 404) msg = "Resource not found.";
    else if (status >= 500) msg = "Server error. Please try again later.";
  } else if (error.code === "ERR_NETWORK") {
    msg = "Network error. Please check your internet connection.";
  } else if (error.code === "EPROTO") {
    msg = "Secure connection failed. Please refresh or try again.";
  }

  return {
    success: false,
    message: msg,
    errors: [{ field: errorField, message: msg }],
  };
};
