import AppLayout from "@/components/layout/app-layout";
import CalendarPage from "@/pages/main/calendar";
import EcommercePage from "@/pages/main/dashboard/ecommerce";
import FormElementsPage from "@/pages/main/forms/form-elements";
import { BlankPage, Error404Page } from "@/pages/main/pages";
import ProfilePage from "@/pages/main/profile";
import BasicTablesPage from "@/pages/main/tables/basic-tables";
import { AuthLayout, SignInPage, SignUpPage } from "@/pages/others/auth";
import BarChartPage from "@/pages/others/charts/bar-chart";
import LineChartPage from "@/pages/others/charts/line-chart";
import Alerts from "@/pages/others/ui-elements/alerts";
import Avatars from "@/pages/others/ui-elements/avatars";
import Badges from "@/pages/others/ui-elements/badges";
import Buttons from "@/pages/others/ui-elements/buttons";
import Images from "@/pages/others/ui-elements/images";
import Videos from "@/pages/others/ui-elements/videos";
import "flatpickr/dist/flatpickr.css";
import { Route, Routes } from "react-router";

export default function App() {
  return (
    <Routes>
      {/* Dashboard Layout */}
      <Route element={<AppLayout />}>
        <Route index element={<EcommercePage />} />

        {/* Others Page */}
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/calendar" element={<CalendarPage />} />
        <Route path="/blank" element={<BlankPage />} />

        {/* Forms */}
        <Route path="/form-elements" element={<FormElementsPage />} />

        {/* Tables */}
        <Route path="/basic-tables" element={<BasicTablesPage />} />

        {/* Ui Elements */}
        <Route path="/alerts" element={<Alerts />} />
        <Route path="/avatars" element={<Avatars />} />
        <Route path="/badge" element={<Badges />} />
        <Route path="/buttons" element={<Buttons />} />
        <Route path="/images" element={<Images />} />
        <Route path="/videos" element={<Videos />} />

        {/* Charts */}
        <Route path="/line-chart" element={<LineChartPage />} />
        <Route path="/bar-chart" element={<BarChartPage />} />
      </Route>

      {/* Auth Layout */}
      <Route element={<AuthLayout />}>
        <Route path="/signin" element={<SignInPage />} />
        <Route path="/signup" element={<SignUpPage />} />
      </Route>

      {/* Fallback Route */}
      <Route path="*" element={<Error404Page />} />
    </Routes>
  );
}
