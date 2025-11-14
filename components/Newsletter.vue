<template>
  <section class="newsletter-modern">
    <div class="newsletter-overlay">
      <div class="newsletter-box">
        <h2 class="newsletter-heading">Abonnieren Sie unseren Newsletter</h2>
        <p class="newsletter-subtext">
          Erhalten Sie die neuesten Updates, Artikel und exklusive Angebote
          direkt in Ihren Posteingang!
        </p>
        <form class="newsletter-form" @submit.prevent="subscribe">
          <input
            type="email"
            v-model="email"
            placeholder="Geben Sie Ihre E-Mail-Adresse ein"
            required
            class="newsletter-input"
          />
          <button type="submit" class="newsletter-btn">
            Abonnieren
            <span class="arrow-icon">→</span>
          </button>
        </form>
        <p v-if="message" class="newsletter-message">{{ message }}</p>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: "Newsletter",
  data() {
    return {
      email: "",
      message: "",
    };
  },
  methods: {
    subscribe() {
      this.message = `Vielen Dank für Ihr Abonnement, ${this.email}!`;
      this.email = "";
    },
  },
};
</script>

<style scoped>
.newsletter-modern {
  border-radius: 2px;
  padding: 70px 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  overflow: hidden;
}

.newsletter-overlay {
  width: 100%;
  max-width: 600px;
  background: #bf003f;
  backdrop-filter: blur(10px);
  border-radius: 20px;
  padding: 50px 30px;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
  text-align: center;
  color: white;
}

.newsletter-heading {
  font-size: 32px;
  font-weight: 700;
  margin-bottom: 15px;
  color: #fff;
  text-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
}

.newsletter-subtext {
  font-size: 16px;
  color: rgba(255, 255, 255, 0.85);
  margin-bottom: 30px;
}

.newsletter-form {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
  flex-wrap: wrap;
}

.newsletter-input {
  padding: 20px 20px;
  width: 70%;
  border: none;
  outline: none;
  font-size: 16px;
  background: rgba(255, 255, 255, 0.9);
  color: #333;
}

.newsletter-btn {
  padding: 20px 17px;
  border: none;
  background: #ffb300;
  color: #fff;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
}

.newsletter-btn:hover {
  background: #ffa000;
  transform: translateY(-2px);
  box-shadow: 0 4px 15px rgba(255, 255, 255, 0.3);
}

.arrow-icon {
  font-size: 18px;
  transition: transform 0.3s ease;
}

.newsletter-btn:hover .arrow-icon {
  transform: translateX(5px);
}

.newsletter-message {
  margin-top: 20px;
  font-weight: 500;
  color: #fff;
  animation: fadeIn 0.4s ease-in-out;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(5px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Responsive */
@media (max-width: 600px) {
  .newsletter-input {
    width: 100%;
  }
  .newsletter-btn {
    width: 100%;
  }
}
</style>
