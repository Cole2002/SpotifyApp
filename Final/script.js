document.getElementById('searchForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const query = document.getElementById('searchInput').value.trim();
    if (query !== '') {
        searchSpotify(query);
    } else {
        alert('Please enter a search query');
    }
});

function searchSpotify(query) {
    const apiUrl = `https://api.spotify.com/v1/search?q=${query}&type=track`;

    fetch(apiUrl, {
        headers: {
            'Authorization': 'Bearer YOUR_SPOTIFY_ACCESS_TOKEN'
        }
    })
    .then(response => response.json())
    .then(data => {
        displayResults(data.tracks.items);
    })
    .catch(error => console.error('Error:', error));
}

function displayResults(tracks) {
    const resultsContainer = document.getElementById('results');
    resultsContainer.innerHTML = '';

    if (tracks.length === 0) {
        resultsContainer.innerHTML = 'No results found';
        return;
    }

    tracks.forEach(track => {
        const trackElement = document.createElement('div');
        trackElement.classList.add('result-item');
        trackElement.textContent = track.name + ' - ' + track.artists[0].name;
        trackElement.addEventListener('click', () => showTrackDetails(track));
        resultsContainer.appendChild(trackElement);
    });
}

function showTrackDetails(track) {
    // Display detailed information about the track (e.g., in a dialog)
    alert(`Track: ${track.name}\nArtist: ${track.artists[0].name}\nAlbum: ${track.album.name}`);
}
