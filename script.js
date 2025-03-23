(() => {
  const isHomePage = () => {
    return window.location.href === "https://www.e-bebek.com/";
  };

  const init = () => {
    if (!isHomePage()) {
      console.log("wrong page");
      return;
    }

    buildHTML();
    buildCSS();
    setEvents();
  };

  const buildHTML = async () => {
    try {
      const response = await fetch(
        "https://gist.githubusercontent.com/sevindi/8bcbde9f02c1d4abe112809c974e1f49/raw/9bf93b58df623a9b16f1db721cd0a7a539296cf0/products.json"
      );

      if (!response.ok) {
        throw new Error(
          "Could not get the data, HTTP error code: " + response.status
        );
      }

      const products = await response.json();

      let html = `
        <div class="product-carousel">
          <button class="carousel-btn prev-btn">
            <img src="https://cdn06.e-bebek.com/assets/svg/prev.svg"></img>
          </button>
          <div class="product-carousel-title">
            <h2>Beğenebileceğinizi düşündüklerimiz</h2>
          </div>
          <div class="product-carousel-container">
            <div class="product-carousel-item">
            ${products
              .map((product, index) => {
                let discountRate = 0;
                if (
                  product.original_price &&
                  product.original_price !== product.price
                ) {
                  discountRate = Math.round(
                    ((product.original_price - product.price) /
                      product.original_price) *
                      100
                  );
                }

                return `
                  <div class="product-card" data-url="${product.url}">
                    <div class="product-card-header">
                      <div class="product-card-favorite" data-id="${index}">
                        <img id="default-favorite" src="https://www.e-bebek.com/assets/svg/default-favorite.svg" alt="heart">
                        <img class="hovered" src="https://www.e-bebek.com/assets/svg/default-hover-favorite.svg" alt="heart">
                      </div>
                      <img id="product-card-image" src="${product.img}" alt="${
                  product.name
                }">
                    </div>
                    <div class="bestseller-tag">
                      <img src="https://www.e-bebek.com/assets/images/cok-satan@2x.png" alt="best seller">
                    </div>
                    <div class="product-card-body">
                      <div class="product-card-title">
                      <strong>${product.brand} - </strong>
                          ${product.name}
                      </div>
                    </div>                    
                    <!-- Fiyat Bölümü -->
                    <div class="product-card-price-container">
                      ${
                        product.original_price &&
                        product.original_price !== product.price
                          ? `
                              <div class="discount-container">
                                <span class="original-price">${product.original_price} TL</span>
                                <span class="discount-badge">%${discountRate} <span class="discount-icon">&#8595;</span></span>
                              </div>
                              <span class="current-price discounted"">${product.price} TL</span>
                            `
                          : `
                              <span class="current-price">${product.price} TL</span>
                            `
                      }
                    </div>
                    <div class="product-card-spacer"></div>

                    <div class="product-card-footer">
                      <button class="product-card-add-to-cart">Sepete Ekle</button>
                    </div>
                  </div>
                `;
              })
              .join("")}
          </div>
        </div>
        <button class="carousel-btn next-btn">
          <img src="https://cdn06.e-bebek.com/assets/svg/next.svg"></img>
        </button>
      </div>
    `;
      const section = document.querySelector(".Section1");
      if (section) {
        section.insertAdjacentHTML("afterend", html);
      } else {
        console.log("No suitable container found for Carousel.");
      }

      setEvents();
    } catch (error) {
      console.error("An error occurred while retrieving product data:", error);
    }
  };

  const buildCSS = () => {
    const css = `
      @import url('https://fonts.googleapis.com/css2?family=Quicksand:wght@700&display=swap');
      
      body {
        font-family: 'Quicksand', sans-serif;
      }
      
      .product-carousel {
        position: relative;
        margin: 0 auto;
        padding: 25px 67px;
        width: 100%;
        padding-right: 15px;
        padding-left: 15px;
        margin-right: auto;
        margin-left: auto;
        max-width: 1320px;
      }

      .carousel-btn {
        position: absolute;
        top: 50%;
        width: 50px;
        height: 50px;
        background: #fff6eb;
        border: none;
        font-size: 4rem;
        font-weight: 300;
        cursor: pointer;
        z-index: 1;
        color: #f18e00;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
      }

      .carousel-btn:hover {
        background-color: #fff;
        color: #f28e00;
        border: 1px solid #f28e00;
      }

      .prev-btn {
        left: -40px;
      }

      .next-btn {
        right: -40px;
      }
      
      .product-carousel-title {
        display: flex;
        align-items: center;
        background-color: #fef6eb;
        padding: 30px 67px;
        border-top-left-radius: 35px;
        border-top-right-radius: 35px;
      }

      .product-carousel-title h2 {
        font-size: 3rem;
        color: #f28e00;
        margin: 0;
      }

      .product-carousel-container {
        display: flex;
        align-items: center;
        position: relative;
        overflow: hidden;
        justify-content: center;
      }

      .product-carousel-item {
        display: flex;
        padding: 20px;
        overflow-x: auto;
        scroll-behavior: smooth;
        scrollbar-width: none;
      }
      
      .product-carousel-item::-webkit-scrollbar {
        display: none;
      }

      .product-card {
        font-family: Poppins, "cursive";
        flex: 0 0 calc((100% - 4 * 20px) / 5);
        margin-right: 20px;
        color: #7d7d7d;
        border: 1px solid #ededed;
        border-radius: 10px;
        background: #fff;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        height: auto;
        overflow: hidden;
        cursor: pointer;
        position: relative;
      }

      .product-card:hover {
        outline: 3px solid #f18e00;
      }

      .product-card-header{
        position: relative;
        align-items: center;
        justify-content: center;
        display: flex;
        width: 100%;
        background-color: #fff;
        margin-bottom: 65px;
      }

      .product-card-header #product-card-image{
        height: 203px;
        object-fit: cover;
        padding: 20px;
      }

      .product-card-favorite {
        position: absolute;
        cursor: pointer;
        background-color: #fff;
        border-radius: 50%;
        box-shadow: 0 2px 4px 0 #00000024;
        width: 50px;
        height: 50px;
        right: 15px;
        top: 10px;
      }

      .product-card-favorite #default-favorite {
        width: 25px;
        height: 25px;
        position: absolute;
        top: 13px;
        right: 12px;
      }

      .product-card-favorite img.hovered {
        width: 50px;
        height: 50px;
        position: absolute;
        opacity: 0;
        transition: opacity 0.3s;
      }

      .product-card-favorite:hover .hovered {
          opacity: 1;
      }

      .product-card-favorite:hover #default-favorite {
        opacity: 0;
      }
    
      .product-card-favorite.favorited .hovered {
        opacity: 1;
        content: url('https://www.e-bebek.com/assets/svg/added-favorite.svg');
      }

      .product-card-favorite.favorited #default-favorite {
        opacity: 0;
      }

      .bestseller-tag {
        position: absolute;
        top: 10px;
        left: 10px;
        width: 56px;
        height: 56.5px;
        z-index: 2;
      }

      .bestseller-tag img {
        width: 100%;
        height: 100%;
      }
    
      .product-card-body{
        padding: 0 17px 17px;
        height: 100%
      }

      .product-card-title {
        font-size: 11px;
        height: 60px;
        overflow: hidden; 
        display: -webkit-box; 
        -webkit-line-clamp: 3; 
        -webkit-box-orient: vertical; 
        line-height: 20px; 
      }

      .product-card-spacer{
        min-height: 70px;
      }
      
      .product-card-price-container {
        margin-left: 15px;
        display: flex;
        flex-direction: column;
        gap: 5px;
      }
      
      .current-price {
        font-size: 20px;
        font-weight: bold;
        color: #7d7d7d;
      }

      .current-price.discounted {
        color: #4caf50;
      }

      .discount-container {
        display: flex;
        align-items: center;
      }

      .original-price {
        text-decoration: line-through;
        color: #7d7d7d;
        font-size: 14px;
        margin-right: 10px;
      }

      .discount-badge {
        display: inline-flex;
        align-items: center;
        color: #4caf50;
        font-size: 20px;
        font-weight: 1000;
      }

      .discount-icon {
        margin-left: 4px;
        font-size: 2rem;
      }

      .product-card-footer{
        padding: 20px;
      }

      .product-card-add-to-cart {
        width: 100%;
        padding: 10px;
        border-radius: 37.5px;
        background-color: #fff7ec;
        color: #f28e00;
        font-family: Poppins, "cursive";
        font-size: 1.4rem;
        font-weight: 700;
        border: none;
        cursor: pointer;
        transition: background-color 0.3s ease;
      }
      
     .product-card-add-to-cart:hover {
        background-color: #f28e00;
        color: #fff;
      }
      
      @media (max-width: 576px) {
        .product-carousel {
          max-width:100vw;
          padding-left: 15px;
          padding-right: 15px 
        }
      }
    
      @media (min-width: 576px) {
        .product-carousel{
          max-width:540px 
        }
      }
      
      @media (min-width: 768px) {
        product-carousel {
          max-width:720px 
        }
      }
      
      @media (min-width: 992px) {
        .product-carousel{
          max-width:960px 
        }
      }
      
      @media (min-width: 1280px) {
        .product-carousel {
          max-width:1180px 
        }
      }
      
      @media (min-width: 1480px) {
        .product-carousel{
          max-width:1296px 
        }
      }
      
      @media (min-width: 1580px) {
        .product-carousel {
          max-width:1320px 
        }
      }
      
      @media (max-width: 1480px) {
        .product-card {
          flex: 0 0 calc((100% - 3 * 20px) / 4);
        }
      }
      
      @media (max-width: 1280px) {
        .product-card {
          flex: 0 0 calc((100% - 2 * 20px) / 3);
        }
      }
      
      @media (max-width: 992px) {
          .product-card {
            flex: 0 0 calc((100% - 1 * 20px) / 2);
          }
          .carousel-btn{
            display: none !important;
          }
      }
      
      @media (max-width: 768px) {
        .product-carousel {
          padding: 15px;
        }
        .product-carousel-title {
          padding: 20px;
        }
      }
      
      @media (max-width: 1200px) {
        .product-carousel {
          justify-content: center;
          flex-wrap: wrap;
        }
      }   
    `;

    const style = document.createElement("style");
    style.innerHTML = css;
    document.head.appendChild(style);
  };

  const setEvents = () => {
    let favorites = JSON.parse(localStorage.getItem("favorites")) || [];

    const favoriteButtons = document.querySelectorAll(".product-card-favorite");
    const carousel = document.querySelector(".product-carousel-item");
    const prevBtn = document.querySelector(".prev-btn");
    const nextBtn = document.querySelector(".next-btn");

    const getScrollAmount = () => {
      const productCard = carousel.querySelector(".product-card");
      if (!productCard) return 250;
      const cardRect = productCard.getBoundingClientRect();
      const style = getComputedStyle(productCard);
      const marginLeft = parseFloat(style.marginLeft);
      const marginRight = parseFloat(style.marginRight);
      return cardRect.width + marginLeft + marginRight;
    };

    const adjustCarouselPosition = () => {
      const scrollStep = getScrollAmount();
      const index = Math.round(carousel.scrollLeft / scrollStep);
      carousel.scrollTo({ left: index * scrollStep, behavior: "smooth" });
    };

    window.addEventListener("resize", adjustCarouselPosition);

    prevBtn.addEventListener("click", () => {
      const scrollAmount = getScrollAmount();
      let newScrollLeft = carousel.scrollLeft - scrollAmount;
      if (newScrollLeft < 0) newScrollLeft = 0;
      carousel.scrollTo({ left: newScrollLeft, behavior: "smooth" });
    });

    nextBtn.addEventListener("click", () => {
      const lastCard = carousel.querySelector(".product-card:last-child");
      if (lastCard) {
        const lastCardRect = lastCard.getBoundingClientRect();
        const carouselRect = carousel.getBoundingClientRect();
        if (lastCardRect.right <= carouselRect.right) {
          return;
        }
      }

      const scrollAmount = getScrollAmount();
      let newScrollLeft = carousel.scrollLeft + scrollAmount;
      const maxScrollLeft = carousel.scrollWidth - carousel.clientWidth;
      if (newScrollLeft > maxScrollLeft) {
        newScrollLeft = maxScrollLeft;
      }
      carousel.scrollTo({ left: newScrollLeft, behavior: "smooth" });
    });

    favoriteButtons.forEach((button) => {
      const productId = button.getAttribute("data-id");

      if (favorites.includes(productId)) {
        button.classList.add("favorited");
      }

      button.addEventListener("click", (event) => {
        event.stopPropagation();
        button.classList.toggle("favorited");

        if (button.classList.contains("favorited")) {
          if (!favorites.includes(productId)) {
            favorites.push(productId);
          }
        } else {
          favorites = favorites.filter((id) => id !== productId);
        }
        localStorage.setItem("favorites", JSON.stringify(favorites));
      });
    });

    const productImages = document.querySelectorAll("#product-card-image");
    productImages.forEach((img) => {
      img.addEventListener("click", (event) => {
        event.stopPropagation();
        const productCard = img.closest(".product-card");
        if (productCard) {
          const productUrl = productCard.getAttribute("data-url");
          if (productUrl) {
            window.open(productUrl, "_blank");
          }
        }
      });
    });
  };

  init();
  
})();
