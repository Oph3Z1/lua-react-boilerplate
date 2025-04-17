// Helper function to check if the environment is a browser
const isEnvBrowser = () => !(window).invokeNative;

/**
 * Function to send data to NUI
 * 
 * @param {string} name - The name of the NUI event to trigger
 * @param {Object} data - The data to send to the NUI event
*/
export const postNUI = async (name, data = {}) => {
    try {
        if (isEnvBrowser()) return null
        const response = await fetch(`https://${GetParentResourceName()}/${name}`, {
            method: "POST",
            mode: "cors",
            cache: "no-cache",
            credentials: "same-origin",
            headers: {
                "Content-Type": "application/json"
            },
            redirect: "follow",
            referrerPolicy: "no-referrer",
            body: JSON.stringify(data),
        });

        return !response.ok ? null : response.json();
    } catch (error) { console.log(error) }
}