window.addEventListener('scroll', function () {
    var navbar = document.querySelector('.navbar');
    if (window.scrollY > 10) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Get the modal
var modal = document.getElementById("joinUsModal");

// Get the button that opens the modal
var btns = document.querySelectorAll(".join-button");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks on the button, open the modal
btns.forEach(function (btn) {
    btn.onclick = function () {
        modal.style.display = "block";
    };
});

// When the user clicks on <span> (x), close the modal
span.onclick = function () {
    modal.style.display = "none";
};

// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
};

// Function to calculate the time remaining
function getTimeRemaining(timestamp) {
    var now = Date.now();
    var timeRemaining = 24 * 60 * 60 * 1000 - (now - timestamp); // 24 hours in milliseconds
    var hours = Math.floor(timeRemaining / (1000 * 60 * 60));
    var minutes = Math.floor((timeRemaining % (1000 * 60 * 60)) / (1000 * 60));
    var seconds = Math.floor((timeRemaining % (1000 * 60)) / 1000);
    return { hours: hours, minutes: minutes, seconds: seconds };
}

// Handle form submission with rate limiting and IP address checking
document.getElementById("joinUsForm").addEventListener("submit", function (event) {
    event.preventDefault();

    // Get the submit button
    var submitButton = document.querySelector('#joinUsForm button[type="submit"]');

    // Disable the submit button to prevent spam
    submitButton.disabled = true;

    // Get form data
    var name = document.getElementById("name").value;
    var gamertag = document.getElementById("gamertag").value;
    var reason = document.getElementById("reason").value;
    var offer = document.getElementById("offer").value;
    var role = document.getElementById("role").value;

    // Get the user's IP address (this is a placeholder, implement a method to get the real IP)
    var ipAddress = 'user-ip-placeholder'; // Placeholder for the user's IP address

    // Check if the user's IP address exists in localStorage and if the last submission was within the last day
    var lastSubmission = localStorage.getItem('lastSubmission');
    if (lastSubmission) {
        var lastSubmissionData = JSON.parse(lastSubmission);
        if (lastSubmissionData.ipAddress === ipAddress && Date.now() - lastSubmissionData.timestamp < 24 * 60 * 60 * 1000) {
            var timeRemaining = getTimeRemaining(lastSubmissionData.timestamp);

            // Show the time remaining modal
            var timeRemainingModal = document.getElementById("timeRemainingModal");
            var timeRemainingMessage = document.getElementById("timeRemainingMessage");
            timeRemainingMessage.textContent = `You have already submitted a form within the last 24 hours. Please try again in ${timeRemaining.hours} hours, ${timeRemaining.minutes} minutes, and ${timeRemaining.seconds} seconds.`;
            timeRemainingModal.style.display = "block";

            submitButton.disabled = false; // Re-enable the submit button
            return;
        }
    }

    // Construct the payload
    var payload = {
        content: `**__New Join Us Form Submission__**\n**Discord Username:** ${name}\n**Gamertag:** ${gamertag}\n**Why you want to join:** ${reason}\n**What can you bring to Konni Company:** ${offer}\n**Select a role:** ${role}`
    };

    // Replace with your Discord webhook URL
    var webhookURL = "https://discord.com/api/webhooks/1243263400335638558/elcSzRE5Xoo4r0E1IvTUR7NyZuxihOCaifPJzetqlV7qi5xwVwg-BpwIDSfRFhPaDmyS";

    // Send the data to Discord
    fetch(webhookURL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
    })
        .then(response => {
            if (response.ok) {
                alert('Your message has been sent!');
                modal.style.display = "none";
                document.getElementById("joinUsForm").reset();

                // Store the timestamp of the current submission along with the user's IP address in localStorage
                localStorage.setItem('lastSubmission', JSON.stringify({ ipAddress: ipAddress, timestamp: Date.now() }));

                // Show the success modal
                var successModal = document.getElementById("successModal");
                successModal.style.display = "block";
            } else {
                alert('There was a problem with the request.');
            }
        })
        .catch(error => {
            console.error('Error:', error);
            alert('There was a problem with the request.');
        })
        .finally(() => {
            // Re-enable the submit button after a delay (e.g., 30 seconds)
            setTimeout(() => {
                submitButton.disabled = false;
            }, 30000); // 30 seconds
        });
});

// Get the success modal
var successModal = document.getElementById("successModal");

// Get the time remaining modal
var timeRemainingModal = document.getElementById("timeRemainingModal");

// Get the <span> elements that close the modals
var successSpan = successModal.getElementsByClassName("close")[0];
var timeRemainingSpan = timeRemainingModal.getElementsByClassName("close")[0];

// When the user clicks on <span> (x), close the modals
successSpan.onclick = function () {
    successModal.style.display = "none";
};

timeRemainingSpan.onclick = function () {
    timeRemainingModal.style.display = "none";
};

// When the user clicks anywhere outside of the modals, close them
window.onclick = function (event) {
    if (event.target == successModal) {
        successModal.style.display = "none";
    } else if (event.target == timeRemainingModal) {
        timeRemainingModal.style.display = "none";
    }
};

// Handle join Discord button click for success modal
document.getElementById("successJoinDiscordButton").addEventListener("click", function () {
    window.open('https://discord.gg/vKJj24guA8', '_blank');
});

// Handle join Discord button click for time remaining modal
document.getElementById("timeRemainingJoinDiscordButton").addEventListener("click", function () {
    window.open('https://discord.gg/vKJj24guA8', '_blank');
});


document.addEventListener('contextmenu', event => {
    if (event.target.tagName === 'IMG') {
        event.preventDefault();
    }
});

document.querySelectorAll('.faq-item').forEach(item => {
    item.addEventListener('click', () => {
        const answer = item.querySelector('.faq-answer');
        answer.style.display = (answer.style.display === 'block') ? 'none' : 'block';
    });
});