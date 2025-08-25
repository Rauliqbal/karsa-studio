import Cookies from "js-cookie";

export default defineNuxtRouteMiddleware((to, from) => {
  // cek token dari localStorage atau cookie
  const token = Cookies.get("karsa_token");

  // kalau sudah login dan mau ke /login atau /register → redirect ke dashboard
  if (token && (to.path === "/login" || to.path === "/register")) {
    return navigateTo("/dashboard"); // ganti sesuai halaman utama kamu
  }
});
