document.addEventListener('DOMContentLoaded', function() {
    const searchButton = document.getElementById('searchButton');
    const searchInput = document.getElementById('searchInput');
    const resultDiv = document.getElementById('result');

    function sanitizeInput(input) {
        return input.replace(/[<>]/g, '').trim();
    }

    async function fetchSuperheroes(query = '') {
        try {
            const url = query
                ? `superheroes.php?query=${encodeURIComponent(query)}`
                : 'superheroes.php';

            const response = await fetch(url);
            const data = await response.text();

            resultDiv.innerHTML = data;

        } catch (error) {
            console.error('Error:', error);
            resultDiv.innerHTML = 'An error occurred while fetching data.';
        }
    }

    searchButton.addEventListener('click', function() {
        const query = sanitizeInput(searchInput.value);
        fetchSuperheroes(query);
    });

    searchInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            const query = sanitizeInput(searchInput.value);
            fetchSuperheroes(query);
        }
    });

    fetchSuperheroes();
});