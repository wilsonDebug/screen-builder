const MAX_MOBILE_WIDTH = 480;
export default {
  data() {
    return {
      isMobile: false, 
    }
  },
  created() {
    window.addEventListener("resize", this.resizeHandler);
  },
  destroyed()  {
    window.removeEventListener("resize", this.resizeHandler);
  },
  mounted() {
    this.checkIfIsMobile();
  },
  methods: {
    resizeHandler() {
      this.checkIfIsMobile();
    },
    checkIfIsMobile(){
      const renderer = document.getElementById("vue-form-renderer");
      this.isMobile = renderer.offsetWidth < MAX_MOBILE_WIDTH;
    }
  },
};
