let paso = 1;
const pasoInicial = 1;
const pasoFinal = 5;

let resultados,
  m,
  n,
  k = 1,
  lambda,
  mu,
  p,
  p0,
  pk,
  pne,
  pe,
  pn,
  lq,
  l,
  wq,
  w,
  ln,
  wn,
  cte,
  cts,
  ctse,
  cs,
  horas,
  CTTE,
  CTTS,
  CTTSE,
  CTS,
  CT;

document.addEventListener("DOMContentLoaded", function () {
  iniciarApp();
});

function iniciarApp() {
  mostrarMobileMenu();
  mostrarSeccion();
  tabs();
  botonesPaginador();
  paginaAnterior();
  paginaSiguiente();
  calcularPics();
  calcularPicm();
  calcularPfcs();
  calcularPfcm();
}

function mostrarMobileMenu() {
  const mobileMenu = document.querySelector("#mobile-menu");
  const nav = document.querySelector(".nav");

  mobileMenu.addEventListener("click", function () {
    nav.classList.toggle("mostrar");
  });
}

function mostrarSeccion() {
  const seccionAnterior = document.querySelector(".mostrarSeccion");
  if (seccionAnterior) {
    seccionAnterior.classList.remove("mostrarSeccion");
  }

  const pasoSelector = `#paso-${paso}`;
  const seccion = document.querySelector(pasoSelector);
  seccion.classList.add("mostrarSeccion");

  const tabAnterior = document.querySelector(".actual");
  if (tabAnterior) {
    tabAnterior.classList.remove("actual");
  }

  const tab = document.querySelector(`[data-paso="${paso}"]`);
  tab.classList.add("actual");
}

function tabs() {
  const enlaces = document.querySelectorAll(".nav a");
  enlaces.forEach((enlace) => {
    enlace.addEventListener("click", function (e) {
      paso = parseInt(e.target.dataset.paso);
      // console.log(paso);
      mostrarSeccion();
      botonesPaginador();
    });
  });
}

function botonesPaginador() {
  const anterior = document.querySelector("#anterior");
  const siguiente = document.querySelector("#siguiente");

  if (paso === 1) {
    anterior.classList.add("ocultar");
    siguiente.classList.remove("ocultar");
  } else if (paso === 4) {
    anterior.classList.remove("ocultar");
    siguiente.classList.add("ocultar");
  } else {
    anterior.classList.remove("ocultar");
    siguiente.classList.remove("ocultar");
  }
  mostrarSeccion();
}

function paginaAnterior() {
  const paginaAnterior = document.querySelector("#anterior");
  paginaAnterior.addEventListener("click", function () {
    if (paso <= pasoInicial) return;
    paso--;
    botonesPaginador();
  });
}

function paginaSiguiente() {
  const paginaSiguiente = document.querySelector("#siguiente");
  paginaSiguiente.addEventListener("click", function () {
    if (paso >= pasoFinal) return;
    paso++;
    botonesPaginador();
  });
}

// Calculos
function calcularPics() {
  const btnCalcular = document.querySelector("#calcularPics");
  btnCalcular.addEventListener("click", function (e) {
    e.preventDefault();
    resultados = document.querySelector("#resultados");
    limpiar();

    lambda = parseFloat(document.querySelector("#lambda").value);
    mu = parseFloat(document.querySelector("#mu").value);
    n = parseFloat(document.querySelector("#n").value);

    cte = parseFloat(document.querySelector("#cte").value);
    cts = parseFloat(document.querySelector("#cts").value);
    ctse = parseFloat(document.querySelector("#ctse").value);
    cs = parseFloat(document.querySelector("#cs").value);
    horas = parseFloat(document.querySelector("#horas").value);

    if (lambda / mu < 1) {
      p = lambda / mu;
      p0 = 1 - lambda / mu;
      pn = p0 * Math.pow(lambda / mu, n);
      l2 = Math.pow(lambda, 2);
      d = mu * (mu - lambda);
      l = lambda / (mu - lambda);
      lq = l2 / d;
      ln = l;
      w = 1 / (mu - lambda);
      wq = lambda / d;
      wn = w;
      CTTE = lambda * horas * wq * cte;
      CTTS = lambda * horas * w * cts;
      CTTSE = lambda * horas * (1 / mu) * ctse;
      CTS = cs;
      CT = CTTE + CTTS + CTTSE + CTS;

      resultados.innerHTML = `
      <p> <span> ρ = </span> ${p.toFixed(4)} </p>
      <p> <span> P<span class="sub">0</span> = </span> ${p0.toFixed(4)} </p>
      <p> <span> P<span class="sub">n</span> = </span> ${pn.toFixed(4)} </p>
      <p> <span> L = </span> ${l.toFixed(4)} </p>
      <p> <span> L<span class="sub">q</span> = </span> ${lq.toFixed(4)} </p>
      <p> <span> L<span class="sub">n</span> = </span> ${ln.toFixed(4)} </p>
      <p> <span> W = </span> ${w.toFixed(4)} </p>
      <p> <span> W<span class="sub">q</span> = </span> ${wq.toFixed(4)} </p>
      <p> <span> W<span class="sub">n</span> = </span> ${wn.toFixed(4)} </p>
      <p> <span> CT<span class="sub">TE</span> = </span> ${CTTE.toFixed(4)} </p>
      <p> <span> CT<span class="sub">TS</span> = </span> ${CTTS.toFixed(4)} </p>
      <p> <span> CT<span class="sub">TSE</span> = </span> ${CTTSE.toFixed(
        2
      )} </p>
      <p> <span> CT<span class="sub">S</span> = </span> ${CTS.toFixed(4)} </p>
      <p> <span> CT<span class="sub"></span> = </span> ${CT.toFixed(4)} </p>

      `;
    } else {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "No cumple la condición de estabilidad",
      });
    }
  });
}

// Calculos
function calcularPicm() {
  const btnCalcular = document.querySelector("#calcularPicm");
  btnCalcular.addEventListener("click", function (e) {
    e.preventDefault();

    resultados = document.querySelector("#resultados2");

    limpiar();

    k = parseFloat(document.querySelector("#k").value);
    lambda = parseFloat(document.querySelector("#lambda2").value);
    mu = parseFloat(document.querySelector("#mu2").value);
    n = parseFloat(document.querySelector("#n2").value);

    cte = parseFloat(document.querySelector("#cte2").value);
    cts = parseFloat(document.querySelector("#cts2").value);
    ctse = parseFloat(document.querySelector("#ctse2").value);
    cs = parseFloat(document.querySelector("#cs2").value);
    horas = parseFloat(document.querySelector("#horas2").value);

    // console.log(lambda / (k * mu) < 1);
    // return;

    if (lambda / (k * mu) < 1) {
      b = Math.pow(lambda / mu, k);
      c = (1 / factorial(k)) * b;
      d = (k * mu) / (k * mu - lambda);
      e = Math.pow(lambda / mu, n);

      p = lambda / mu;

      p0 = 1 / (sumatoria(k, lambda, mu) + c * d);

      pk = c * d * p0;

      pne = 1 - pk;

      if (pne < 0) {
        pne = 0;
      }

      if (n < k) {
        pn = (p0 / factorial(n)) * e;
      } else if (n >= k) {
        pn = (1 / (factorial(k) * Math.pow(k, n - k))) * e * p0;
      }

      f = lambda * mu * b;

      g = factorial(k - 1) * Math.pow(k * mu - lambda, 2);

      h = mu * b;

      l = (f / g) * p0 * p;

      lq = (f * p0) / g;

      ln = lq / pk;

      w = (h * p0) / g + 1 / mu;

      wq = (h * p0) / g;

      wn = wq / pk;

      CTTE = lambda * horas * wq * cte;
      CTTS = lambda * horas * w * cts;
      CTTSE = lambda * horas * (1 / mu) * ctse;
      CTS = k * cs;
      CT = CTTE + CTTS + CTTSE + CTS;

      resultados.innerHTML = `
      <p> <span> P<span class="sub">0</span> = </span> ${p0.toFixed(4)} </p>
      <p> <span> P<span class="sub">k</span> = </span> ${pk.toFixed(4)} </p>
      <p> <span> P<span class="sub">NE</span> = </span> ${pne.toFixed(4)} </p>
      <p> <span> P<span class="sub">n</span> = </span> ${pn.toFixed(4)} </p>
      <p> <span> L = </span> ${l.toFixed(4)} </p>
      <p> <span> L<span class="sub">q</span> = </span> ${lq.toFixed(4)} </p>
      <p> <span> L<span class="sub">n</span> = </span> ${ln.toFixed(4)} </p>
      <p> <span> W = </span> ${w.toFixed(4)} </p>
      <p> <span> W<span class="sub">q</span> = </span> ${wq.toFixed(4)} </p>
      <p> <span> W<span class="sub">n</span> = </span> ${wn.toFixed(4)} </p>
      <p> <span> CT<span class="sub">TE</span> = </span> ${CTTE.toFixed(4)} </p>
      <p> <span> CT<span class="sub">TS</span> = </span> ${CTTS.toFixed(4)} </p>
      <p> <span> CT<span class="sub">TSE</span> = </span> ${CTTSE.toFixed(
        2
      )} </p>
      <p> <span> CT<span class="sub">S</span> = </span> ${CTS.toFixed(4)} </p>
      <p> <span> CT<span class="sub"></span> = </span> ${CT.toFixed(4)} </p>

      `;
    } else {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "No cumple la condición de estabilidad",
      });
    }
  });
}

// Calculos
function calcularPfcs() {
  const btnCalcular = document.querySelector("#calcularPfcs");
  btnCalcular.addEventListener("click", function (e) {
    e.preventDefault();
    resultados = document.querySelector("#resultados3");
    limpiar();

    lambda = parseFloat(document.querySelector("#lambda3").value);
    mu = parseFloat(document.querySelector("#mu3").value);
    m = parseFloat(document.querySelector("#m").value);
    n = parseFloat(document.querySelector("#n3").value);

    cte = parseFloat(document.querySelector("#cte3").value);
    cts = parseFloat(document.querySelector("#cts3").value);
    ctse = parseFloat(document.querySelector("#ctse3").value);
    cs = parseFloat(document.querySelector("#cs3").value);
    horas = parseFloat(document.querySelector("#horas3").value);

    if (lambda / mu < 1) {
      p0 = 1 / sumatoriaM(m, lambda, mu);

      pe = 1 - p0;

      pn = (factorial(m) / factorial(m - n)) * Math.pow(lambda / mu, n) * p0;

      l = m - (mu / lambda) * pe;

      lq = m - ((lambda + mu) / lambda) * pe;

      ln = lq / pe;

      aux = m - l;

      wq = lq / (aux * lambda);

      w = wq + 1 / mu;

      wn = wq / pe;

      CTTE = lambda * horas * wq * cte;
      CTTS = lambda * horas * w * cts;
      CTTSE = lambda * horas * (1 / mu) * ctse;
      CTS = cs;
      CT = CTTE + CTTS + CTTSE + CTS;

      resultados.innerHTML = `
      <p> <span> P<span class="sub">0</span> = </span> ${p0.toFixed(4)} </p>
      <p> <span> P<span class="sub">E</span> = </span> ${pe.toFixed(4)} </p>
      <p> <span> P<span class="sub">n</span> = </span> ${pn.toFixed(4)} </p>
      <p> <span> L = </span> ${l.toFixed(4)} </p>
      <p> <span> L<span class="sub">q</span> = </span> ${lq.toFixed(4)} </p>
      <p> <span> L<span class="sub">n</span> = </span> ${ln.toFixed(4)} </p>
      <p> <span> W = </span> ${w.toFixed(4)} </p>
      <p> <span> W<span class="sub">q</span> = </span> ${wq.toFixed(4)} </p>
      <p> <span> W<span class="sub">n</span> = </span> ${wn.toFixed(4)} </p>
      <p> <span> CT<span class="sub">TE</span> = </span> ${CTTE.toFixed(4)} </p>
      <p> <span> CT<span class="sub">TS</span> = </span> ${CTTS.toFixed(4)} </p>
      <p> <span> CT<span class="sub">TSE</span> = </span> ${CTTSE.toFixed(
        2
      )} </p>
      <p> <span> CT<span class="sub">S</span> = </span> ${CTS.toFixed(4)} </p>
      <p> <span> CT<span class="sub"></span> = </span> ${CT.toFixed(4)} </p>

      `;
    } else {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "No cumple la condición de estabilidad",
      });
    }
  });
}

// Calculos
function calcularPfcm() {
  const btnCalcular = document.querySelector("#calcularPfcm");
  btnCalcular.addEventListener("click", function (e) {
    e.preventDefault();
    resultados = document.querySelector("#resultados4");
    limpiar();

    k = parseFloat(document.querySelector("#k2").value);
    lambda = parseFloat(document.querySelector("#lambda4").value);
    mu = parseFloat(document.querySelector("#mu4").value);
    m = parseFloat(document.querySelector("#m2").value);
    n = parseFloat(document.querySelector("#n4").value);

    cte = parseFloat(document.querySelector("#cte4").value);
    cts = parseFloat(document.querySelector("#cts4").value);
    ctse = parseFloat(document.querySelector("#ctse4").value);
    cs = parseFloat(document.querySelector("#cs4").value);
    horas = parseFloat(document.querySelector("#horas4").value);

    if (lambda / (k * mu) < 1) {
      p0 = 1 / (sumatoriaM1(k, m, lambda, mu) + sumatoriaM2(k, m, lambda, mu));

      pn = calcularPn(lambda, mu, k, m, n);

      pe = 1 - calcularPe(lambda, mu, k, m);

      pne = 1 - pe;

      l = calcularL(lambda, mu, k, m);

      lq = calcularLq(lambda, mu, k, m);

      ln = lq / pe;
      wq = lq / ((m - l) * lambda);
      w = wq + 1 / mu;
      wn = wq / pe;

      CTTE = lambda * horas * wq * cte;
      CTTS = lambda * horas * w * cts;
      CTTSE = lambda * horas * (1 / mu) * ctse;
      CTS = k * cs;
      CT = CTTE + CTTS + CTTSE + CTS;

      resultados.innerHTML = `
      <p> <span> P<span class="sub">0</span> = </span> ${p0.toFixed(4)} </p>
      <p> <span> P<span class="sub">n</span> = </span> ${pn.toFixed(4)} </p>
      <p> <span> P<span class="sub">E</span> = </span> ${pe.toFixed(4)} </p>
      <p> <span> P<span class="sub">NE</span> = </span> ${pne.toFixed(4)} </p>
      <p> <span> L = </span> ${l.toFixed(4)} </p>
      <p> <span> L<span class="sub">q</span> = </span> ${lq.toFixed(4)} </p>
      <p> <span> L<span class="sub">n</span> = </span> ${ln.toFixed(4)} </p>
      <p> <span> W = </span> ${w.toFixed(4)} </p>
      <p> <span> W<span class="sub">q</span> = </span> ${wq.toFixed(4)} </p>
      <p> <span> W<span class="sub">n</span> = </span> ${wn.toFixed(4)} </p>
      <p> <span> CT<span class="sub">TE</span> = </span> ${CTTE.toFixed(4)} </p>
      <p> <span> CT<span class="sub">TS</span> = </span> ${CTTS.toFixed(4)} </p>
      <p> <span> CT<span class="sub">TSE</span> = </span> ${CTTSE.toFixed(
        2
      )} </p>
      <p> <span> CT<span class="sub">S</span> = </span> ${CTS.toFixed(4)} </p>
      <p> <span> CT<span class="sub"></span> = </span> ${CT.toFixed(4)} </p>

      `;
    } else {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "No cumple la condición de estabilidad",
      });
    }
  });
}

function limpiar() {
  resultados.innerHTML = "";
}

function sumatoria(k, lambda, mu) {
  let result = 0;
  for (let i = 0; i <= k - 1; i++) {
    result += (1 / factorial(i)) * Math.pow(lambda / mu, i);
  }
  return result;
}

function sumatoriaM(m, lambda, mu) {
  let resp = 0;
  for (let i = 0; i <= m; i++) {
    resp += (factorial(m) / factorial(m - i)) * Math.pow(lambda / mu, i);
  }
  return resp;
}

function sumatoriaM1(k, m, lambda, mu) {
  let result = 0;
  for (let i = 0; i <= k - 1; i++) {
    result +=
      (factorial(m) / (factorial(m - i) * factorial(i))) *
      Math.pow(lambda / mu, i);
  }
  return result;
}

function sumatoriaM2(k, m, lambda, mu) {
  let result = 0;
  for (let i = k; i <= m; i++) {
    result +=
      (factorial(m) / (factorial(m - i) * factorial(k) * Math.pow(k, i - k))) *
      Math.pow(lambda / mu, i);
  }
  return result;
}

function calcularPn(lambda, mu, k, m, n) {
  let pn;
  if (n >= 0 && n <= k) {
    pn =
      p0 *
      ((factorial(m) / (factorial(m - n) * factorial(n))) *
        Math.pow(lambda / mu, n));
  } else if (n >= k && n <= m) {
    pn =
      p0 *
      ((factorial(m) / (factorial(m - n) * factorial(k) * Math.pow(k, n - k))) *
        Math.pow(lambda / mu, n));
  }
  return pn;
}

function calcularPe(lambda, mu, k, m) {
  let res = 0;
  for (let i = 0; i <= k - 1; i++) {
    res += calcularPn(lambda, mu, k, m, i);
  }
  return res;
}

function calcularL(lambda, mu, k, m) {
  let sum1 = 0,
    sum3 = 0;
  for (let i = 0; i <= k - 1; i++) {
    sum1 += i * calcularPn(lambda, mu, k, m, i);
    sum3 += calcularPn(lambda, mu, k, m, i);
  }
  sum3 = k * (1 - sum3);
  return sum1 + calcularLq(lambda, mu, k, m) + sum3;
}

function calcularLq(lambda, mu, k, m) {
  let res = 0;
  for (let i = k; i <= m; i++) {
    res += (i - k) * calcularPn(lambda, mu, k, m, i);
  }
  return res;
}

function factorial(num) {
  let r = num;
  if (num === 0 || num === 1) return 1;
  while (num > 1) {
    num--;
    r *= num;
  }
  return r;
}
