<template>
  <div class="img-box">
    <div class="real-box">
    <span style="--i:1"><a href=""><img src="@/assets/dune_poster.jpg"></a></span>
    <span style="--i:2"><a href=""><img src="@/assets/dune_poster.jpg"></a></span>
    <span style="--i:3"><a href=""><img src="@/assets/dune_poster.jpg"></a></span>
    <span style="--i:4"><a href=""><img src="@/assets/dune_poster.jpg"></a></span>
    <span style="--i:5"><a href=""><img src="@/assets/dune_poster.jpg"></a></span>
    <span style="--i:6"><a href=""><img src="@/assets/dune_poster.jpg"></a></span>
    <span style="--i:7"><a href=""><img src="@/assets/dune_poster.jpg"></a></span>
    <span style="--i:8"><a href=""><img src="@/assets/dune_poster.jpg"></a></span>
  </div>
  </div>
</template>

<script>
export default {
  name: 'MovieBoxOffice'

}
</script>

<style scoped>
  img {
    /* width: 200px;
    height: 200px; */
  }
  .img-box {
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 50vh;
    /* background: #000f; */
  }
  .real-box {
    position: relative;
    width: 230px;
    height: 230px;
    transform-style: preserve-3d;
    animation: animate 30s linear infinite;
  }

  @keyframes animate
  {
    0%
    {
      transform: perspective(1000px) rotateY(0deg);
    }
    100%
    {
      transform: perspective(1000px) rotateY(360deg);
    }
  }


  .real-box span {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    transform-origin: center;
    transform-style: preserve-3d;
    transform: rotateY(calc(var(--i) * 45deg )) translateZ(400px);
    -webkit-box-reflect: below 0px linear-gradient(transparent, transparent, #0008);
  }

  .real-box span img {
    position: absolute;
    top: 0;
    left: 0;
    widows: 100%;
    height: 100%;
    object-fit: cover;
    
  }

</style>