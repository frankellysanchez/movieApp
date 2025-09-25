export default class Cards {

    pages = 1
    isLoading = false

    youtubeAutorisation = "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiMjFhNjZlNTRiZDU0OWE3YjczMjQzOWM5OTFkYTQ2NSIsInN1YiI6IjYzZjQwYjNiNTI0OTc4MDBkYzQ0YTA1MyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.iydeub5JtaJT2xXmsFu0dXQah2tkJt0yW26ni1Dssak"
    getApi = async () => {
        if (this.isLoading) return;

        const API_URL = "https://api.themoviedb.org/3/movie/now_playing?";
        const API_KEY = "api_key=b21a66e54bd549a7b732439c991da465";
        const prueba = API_URL + API_KEY;
        const closeBtn = document.getElementById("closeBtn");
        const ShowandHiddeCards = document.getElementById("ShowandHiddeCards");
        const mainContainer = document.getElementById("main_container");

        this.isLoading = true;
        this.updateButtonStates();

        try {
            // Add fade-out transition
            mainContainer.style.opacity = '0';
            mainContainer.style.transform = 'translateY(20px)';

            // Wait for fade-out to complete
            await new Promise(resolve => setTimeout(resolve, 150));

            mainContainer.innerHTML = '<div class="loading">Loading movies...</div>';

            // Fade back in
            mainContainer.style.opacity = '1';
            mainContainer.style.transform = 'translateY(0)';

            const res = await fetch(`${prueba}&page=${this.pages}`);

            if (!res.ok) {
                throw new Error(`HTTP error! status: ${res.status}`);
            }

            const json = await res.json();

            // Fade out again before showing new content
            mainContainer.style.opacity = '0';
            await new Promise(resolve => setTimeout(resolve, 100));

            this.getPoster(json);

            // Fade in the new content
            mainContainer.style.opacity = '1';

        } catch (err) {
            console.error('Error fetching movies:', err);
            mainContainer.innerHTML = '<div class="error">Error loading movies. Please try again.</div>';
            mainContainer.style.opacity = '1';
        } finally {
            this.isLoading = false;
            this.updateButtonStates();
        }
    }

    init() {
        const backBtn = document.getElementById('back-button');
        const nextBtn = document.getElementById('next-button');

        // Update button states based on current page
        this.updateButtonStates();

        nextBtn.addEventListener('click', () => {
            if (!this.isLoading && this.pages < 1000) {
                this.pages++;
                this.getApi();
            }
        });

        backBtn.addEventListener('click', () => {
            if (!this.isLoading && this.pages > 1) {
                this.pages--;
                this.getApi();
            }
        });
    }

    updateButtonStates() {
        const backBtn = document.getElementById('back-button');
        const nextBtn = document.getElementById('next-button');

        // Disable buttons while loading or at boundaries
        backBtn.disabled = this.isLoading || this.pages === 1;
        nextBtn.disabled = this.isLoading || this.pages >= 1000;

        // Update page indicator
        const subTitle = document.getElementById('subTittle');
        if (this.isLoading) {
            subTitle.textContent = `Recent - Loading...`;
        } else {
            subTitle.textContent = `Recent - Page ${this.pages}`;
        }

        // Update pagination numbers
        this.updatePaginationNumbers();
    }

    updatePaginationNumbers() {
        const pageNumbersContainer = document.getElementById('page-numbers');
        if (!pageNumbersContainer) return;

        pageNumbersContainer.innerHTML = '';
        const maxPages = 1000;
        const currentPage = this.pages;

        // Logic for showing page numbers
        let startPage, endPage;
        const maxVisiblePages = 7;

        if (maxPages <= maxVisiblePages) {
            startPage = 1;
            endPage = maxPages;
        } else {
            if (currentPage <= 4) {
                startPage = 1;
                endPage = maxVisiblePages;
            } else if (currentPage >= maxPages - 3) {
                startPage = maxPages - maxVisiblePages + 1;
                endPage = maxPages;
            } else {
                startPage = currentPage - 3;
                endPage = currentPage + 3;
            }
        }

        // First page
        if (startPage > 1) {
            this.createPageNumber(1);
            if (startPage > 2) {
                this.createEllipsis();
            }
        }

        // Page numbers
        for (let i = startPage; i <= endPage; i++) {
            this.createPageNumber(i);
        }

        // Last page
        if (endPage < maxPages) {
            if (endPage < maxPages - 1) {
                this.createEllipsis();
            }
            this.createPageNumber(maxPages);
        }
    }

    createPageNumber(pageNum) {
        const pageNumbersContainer = document.getElementById('page-numbers');
        const pageElement = document.createElement('div');
        pageElement.className = `page-number ${pageNum === this.pages ? 'active' : ''}`;
        pageElement.textContent = pageNum;
        pageElement.addEventListener('click', () => {
            if (!this.isLoading && pageNum !== this.pages) {
                this.pages = pageNum;
                this.getApi();
            }
        });
        pageNumbersContainer.appendChild(pageElement);
    }

    createEllipsis() {
        const pageNumbersContainer = document.getElementById('page-numbers');
        const ellipsis = document.createElement('span');
        ellipsis.className = 'page-ellipsis';
        ellipsis.textContent = '...';
        pageNumbersContainer.appendChild(ellipsis);
    }



    getPoster(json) {
        const mainContainer = document.getElementById("main_container");
        const IMG_URL = 'https://image.tmdb.org/t/p/original';
        const posterContainer = document.getElementById("posterContainer");

        // Clear existing content before adding new movies
        mainContainer.innerHTML = '';

        // Check if there are results
        if (!json.results || json.results.length === 0) {
            mainContainer.innerHTML = '<div class="error">No movies found for this page.</div>';
            return;
        }

        json.results.forEach((movie, index) => {
            const poster = document.createElement('img');
            poster.className = 'poster';
            poster.src = `${IMG_URL}${movie.poster_path}`;

            // Add staggered animation
            poster.style.opacity = '0';
            poster.style.transform = 'translateY(30px) scale(0.9)';
            mainContainer.appendChild(poster);

            // Animate in with delay
            setTimeout(() => {
                poster.style.opacity = '1';
                poster.style.transform = 'translateY(0) scale(1)';
            }, index * 50);

            const options = {
                method: 'GET',
                headers: {
                    accept: 'application/json',
                    Authorization: `Bearer ${this.youtubeAutorisation}`
                }
            };

            const handlePosterClick = async () => {
                try {
                    const response = await fetch(`https://api.themoviedb.org/3/movie/${movie.id}/videos?language=en-US`, options);
                    const videoInfo = await response.json();
                    let infMovie = [];
                    let keyVideo = videoInfo.results;
                    let key = []
                    keyVideo.forEach(video => {
                        if (video.name === "Official Trailer" || video.name === "Official Trailer [Subtitled]" || video.name === "Official US Trailer") {
                            key.push(video.key)
                        }
                    });

                    // Check if dark mode is active when creating the modal
                    const body = document.getElementById("body");
                    const isDarkMode = body && body.classList.contains("bodyColor");

                    posterContainer.innerHTML = "";

                    infMovie += `<div class="showMovieInfContainer">
                                        <div class="infContainer">
                                            <img src="${IMG_URL}${movie.backdrop_path}" width="100%" height="100%">
                                        </div>
                                        <div class="reviewContainer">
                                        <h1>${movie.title}</h1>
                                            <p class="date"><strong>Date:</strong> ${movie.release_date}</p>
                                            <p><strong>Language:</strong> ${movie.original_language}</p>
                                        </div>
                                        <div class="reviewContainer">

                                            <p><strong>Overview</strong> <br/>${movie.overview}</p>
                                        </div>
                                        <div class="trailerContainer">
                                            <iframe width="100%" height="100%" src="https://www.youtube.com/embed/${key}" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
                                        </div>
                                    </div>`;

                    // Insert HTML first
                    posterContainer.innerHTML = infMovie;

                    // THEN apply dark mode class after HTML is inserted
                    if (isDarkMode) {
                        posterContainer.classList.add("bodyColor");
                    } else {
                        posterContainer.classList.remove("bodyColor");
                    }
                } catch (err) {
                    console.error(err);
                }
            };


            closeBtn.addEventListener("click", () => {
                posterContainer.style.display = "none";
                closeBtn.style.display = "none"
                ShowandHiddeCards.style.display = "block"
                posterContainer.innerHTML = ""
            });
            // Asociar el evento de clic al póster
            poster.addEventListener('click', () => {
                ShowandHiddeCards.style.display = "none"
                closeBtn.style.display = "block"
                posterContainer.style.display = "block"
                handlePosterClick()
            });
        });
    }




}