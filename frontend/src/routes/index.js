import { createBrowserRouter } from "react-router-dom"
import App from "../App"
import HomePage from "../pages/HomePage"
import LoginPage from "../pages/LoginPage"
import SignUpPage from "../pages/SignUpPage"
import ForgotPasswordPage from "../pages/ForgotPasswordPage"
import AdminPanelPage from "../pages/AdminPanelPage"
import AllUsersPage from "../pages/AllUsersPage"
import AllProductsPage from "../pages/AllProductsPage"
import CategoryProductPage from "../pages/CategoryProductPage"
import ProductDetailsPage from "../pages/ProductDetailsPage"
import CartPage from "../pages/CartPage"
import SearchProductPage from "../pages/SearchProductPage"


const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        children: [
            {
                path: "",
                element: <HomePage />
            },
            {
                path: "login",
                element: <LoginPage />
            },
            {
                path: "forgot-password",
                element: <ForgotPasswordPage />
            },
            {
                path: "signup",
                element: <SignUpPage />
            },
            {
                path: "product-category",
                element: <CategoryProductPage />
            },
            {
                path: "cart",
                element: <CartPage />
            },
            {
                path: "product/:id",
                element: <ProductDetailsPage />
            },
            {
                path: "search",
                element: <SearchProductPage />
            },
            {
                path: "admin-panel",
                element: <AdminPanelPage />,
                children: [
                    {
                        path: "all-users",
                        element: <AllUsersPage />
                    },
                    {
                        path: "all-products",
                        element: <AllProductsPage />
                    }
                ]
            }
        ]
    }
])


export default router