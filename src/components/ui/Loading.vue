<template>
  <div class="loader"></div>
</template>

<style scoped>
.loader {
  width: 100px;
  height: 32px;
  background: #3FD97F;
  --c:no-repeat linear-gradient(#000 0 0);
  --s:23px 23px;
  -webkit-mask:
    var(--c) left  4px top 50%,
    var(--c) center,
    var(--c) right 4px top 50%,
    linear-gradient(#000 0 0);
  -webkit-mask-composite:xor;
          mask-composite:exclude;
  animation: l2 1.5s infinite;
}
@keyframes l2 {
  0%    {-webkit-mask-size:0    0  ,0    0  ,0    0  ,auto}
  16.67%{-webkit-mask-size:var(--s),0    0  ,0    0  ,auto}
  33.33%{-webkit-mask-size:var(--s),var(--s),0    0  ,auto}
  50%   {-webkit-mask-size:var(--s),var(--s),var(--s),auto}
  66.67%{-webkit-mask-size:0    0  ,var(--s),var(--s),auto}
  83.33%{-webkit-mask-size:0    0  ,0    0  ,var(--s),auto}
  100%  {-webkit-mask-size:0    0  ,0    0  ,0    0  ,auto}
}
</style>