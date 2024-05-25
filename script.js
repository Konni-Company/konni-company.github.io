window.addEventListener('scroll', function () {
    var navbar = document.querySelector('.navbar');
    if (window.scrollY > 10) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

var modal = document.getElementById("joinUsModal");

var btns = document.querySelectorAll(".join-button");

var span = document.getElementsByClassName("close")[0];

btns.forEach(function (btn) {
    btn.onclick = function () {
        modal.style.display = "block";
    };
});

span.onclick = function () {
    modal.style.display = "none";
};

window.onclick = function (event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
};

function getTimeRemaining(timestamp) {
    var now = Date.now();
    var timeRemaining = 24 * 60 * 60 * 1000 - (now - timestamp);
    var hours = Math.floor(timeRemaining / (1000 * 60 * 60));
    var minutes = Math.floor((timeRemaining % (1000 * 60 * 60)) / (1000 * 60));
    var seconds = Math.floor((timeRemaining % (1000 * 60)) / 1000);
    return { hours: hours, minutes: minutes, seconds: seconds };
}

document.getElementById("joinUsForm").addEventListener("submit", function (event) {
    event.preventDefault();

    var submitButton = document.querySelector('#joinUsForm button[type="submit"]');

    submitButton.disabled = true;

    var name = document.getElementById("name").value;
    var gamertag = document.getElementById("gamertag").value;
    var reason = document.getElementById("reason").value;
    var offer = document.getElementById("offer").value;
    var role = document.getElementById("role").value;

    var ipAddress = 'user-ip-placeholder';

    var lastSubmission = localStorage.getItem('lastSubmission');
    if (lastSubmission) {
        var lastSubmissionData = JSON.parse(lastSubmission);
        if (lastSubmissionData.ipAddress === ipAddress && Date.now() - lastSubmissionData.timestamp < 24 * 60 * 60 * 1000) {
            var timeRemaining = getTimeRemaining(lastSubmissionData.timestamp);

            var timeRemainingModal = document.getElementById("timeRemainingModal");
            var timeRemainingMessage = document.getElementById("timeRemainingMessage");
            timeRemainingMessage.textContent = `You have already submitted a form within the last 24 hours. Please try again in ${timeRemaining.hours} hours, ${timeRemaining.minutes} minutes, and ${timeRemaining.seconds} seconds.`;
            timeRemainingModal.style.display = "block";

            submitButton.disabled = false;
            return;
        }
    }

    var payload = {
        content: `**__New Join Us Form Submission__**\n**Discord Username:** ${name}\n**Gamertag:** ${gamertag}\n**Why you want to join:** ${reason}\n**What can you bring to Konni Company:** ${offer}\n**Select a role:** ${role}`
    };

    var webhookURL = "https://discord.com/api/webhooks/1243263400335638558/elcSzRE5Xoo4r0E1IvTUR7NyZuxihOCaifPJzetqlV7qi5xwVwg-BpwIDSfRFhPaDmyS";

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

                localStorage.setItem('lastSubmission', JSON.stringify({ ipAddress: ipAddress, timestamp: Date.now() }));

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
            setTimeout(() => {
                submitButton.disabled = false;
            }, 30000);
        });
});

var successModal = document.getElementById("successModal");

var timeRemainingModal = document.getElementById("timeRemainingModal");

var successSpan = successModal.getElementsByClassName("close")[0];
var timeRemainingSpan = timeRemainingModal.getElementsByClassName("close")[0];

successSpan.onclick = function () {
    successModal.style.display = "none";
};

timeRemainingSpan.onclick = function () {
    timeRemainingModal.style.display = "none";
};

window.onclick = function (event) {
    if (event.target == successModal) {
        successModal.style.display = "none";
    } else if (event.target == timeRemainingModal) {
        timeRemainingModal.style.display = "none";
    }
};

document.getElementById("successJoinDiscordButton").addEventListener("click", function () {
    window.open('https://discord.gg/vKJj24guA8', '_blank');
});

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
