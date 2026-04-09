function getRecommendation() {

    const teamSize = document.getElementById("team_size").value;

    // ✅ Validate input first
    if (!teamSize) {
        document.getElementById("result").innerText = "Please enter team size!";
        return;
    }

    const data = {
        team_size: parseInt(teamSize),
        project_type: document.getElementById("project_type").value.toLowerCase(),
        tech_stack: document.getElementById("tech_stack").value.toLowerCase(),
        ci_cd: document.getElementById("ci_cd").value.toLowerCase().includes("yes") ? "yes" : "no",
        cloud: document.getElementById("cloud").value,
        monitoring: document.getElementById("monitoring").value.toLowerCase().includes("yes") ? "yes" : "no"
    };

    console.log("Sending data:", data); // ✅ Debug log

    fetch("https://devops-recommender.onrender.com/predict", {
        method: "POST",
        mode: "cors",   // ✅ IMPORTANT FIX
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    })
    .then(response => {
        if (!response.ok) {
            throw new Error("Server error: " + response.status);
        }
        return response.json();
    })
    .then(result => {
        document.getElementById("result").innerText =
            "Recommended Tool: " + result.recommended_tool;
    })
    .catch(error => {
        console.error("Error:", error);

        document.getElementById("result").innerText =
            "❌ Cannot connect to backend. Make sure Flask is running on port 5000.";
    });
}
