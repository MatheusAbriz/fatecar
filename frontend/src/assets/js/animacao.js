//Animação dos elementos da página
document.addEventListener('DOMContentLoaded', function(e){
    const secoes = gsap.utils.toArray('.container-animacao');
    secoes.forEach(secoes =>{
      const anim = gsap.fromTo(secoes,{
        autoAlpha: 0,
        y: 100,
        x: -100,
        rotate: -10
      },{
        duration: 0.6,
        autoAlpha: 1,
        y: 0,
        x: 0,
        rotate: 0
      }
    );
    ScrollTrigger.create({
      trigger: secoes,
      toggleActions: "restart",
      animation: anim,
    });
    });
  })