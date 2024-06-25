import { useEffect, useState } from "react"
import UploadProduct from "../components/UploadProduct"
import SummaryApi from "../common"
import AdminProductCard from "../components/AdminProductCard"


const AllProductsPage = () => {
    const [openUploadProduct, setOpenUploadProduct] = useState(false)
    const [allProducts, setAllProducts] = useState([])

    const fetchAllProduct = async () => {
        try {
            const response = await fetch(SummaryApi.allProduct.url)

            if (!response.ok) {
                throw new Error("Network response was not ok")
            }

            const dataResponse = await response.json()
            setAllProducts(dataResponse.data)
        } catch (error) {
            console.error("Fetch error:", error)
        }
    };

    useEffect(() => {
        const timer = setTimeout(() => {
            fetchAllProduct()
        }, 2000)

        return () => clearTimeout(timer)
    }, [])

    return (
        <div>
            <div className="bg-white py-2 px-4 flex justify-between items-center">
                <h2 className="font-bold text-lg">All Products</h2>
                <button
                    onClick={() => setOpenUploadProduct(true)}
                    className="border-2 border-red-600 text-red-600 hover:bg-red-600 hover:text-white transition-all py-1 px-3 rounded-full">
                    Add Product
                </button>
            </div>
            <div className="h-[calc(100vh-190px)] overflow-y-scroll">
                <div className="flex items-start flex-wrap gap-5 py-4">
                    {
                        allProducts?.map((product, index) => (
                            <AdminProductCard
                                key={index}
                                data={product}
                                fetchData={fetchAllProduct}
                            />
                        ))
                    }
                </div>
            </div>
            {
                openUploadProduct && (
                    <UploadProduct
                        onClose={() => setOpenUploadProduct(false)}
                        fetchData={fetchAllProduct}
                    />
                )
            }
        </div>
    )
}


export default AllProductsPage;
