export const submitToWeb3Forms = async (formData) => {
    const accessKey = "a2376089-bec8-45eb-b1bc-9293c91bde50"; // User needs to replace this

    // Prepare the data for Web3Forms
    const submissionData = {
        access_key: accessKey,
        subject: formData.subject || `New Submission - ${formData.service || 'General'}`,
        from_name: formData.name,
        ...formData
    };

    try {
        const response = await fetch("https://api.web3forms.com/submit", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
            },
            body: JSON.stringify(submissionData),
        });

        const result = await response.json();
        return result;
    } catch (error) {
        console.error("Web3Forms Submission Error:", error);
        return { success: false, message: "Network error. Please try again." };
    }
};
