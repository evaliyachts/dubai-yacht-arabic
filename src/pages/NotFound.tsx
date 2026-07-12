import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Helmet } from "react-helmet-async";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-muted" dir="rtl">
      <Helmet>
        <html lang="ar-AE" dir="rtl" />
        <title>الصفحة غير موجودة | يخوت دبي</title>
        <meta name="description" content="الصفحة المطلوبة غير موجودة. يمكنك العودة إلى الصفحة الرئيسية لموقع يخوت دبي." />
        <meta name="robots" content="noindex, follow" />
      </Helmet>
      <main className="text-center">
        <h1 className="mb-4 text-4xl font-bold">404 — الصفحة غير موجودة</h1>
        <p className="mb-4 text-xl text-muted-foreground">تعذر العثور على الصفحة المطلوبة.</p>
        <a href="/" className="text-primary underline hover:text-primary/90">
          العودة إلى الرئيسية
        </a>
      </main>
    </div>
  );
};

export default NotFound;
