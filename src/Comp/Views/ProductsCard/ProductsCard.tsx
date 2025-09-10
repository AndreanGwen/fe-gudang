import { Alert, AlertTitle } from "@/components/ui/alert";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import axios from "axios";
import Image from "next/image";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { BiSolidCategoryAlt } from "react-icons/bi";
import { LuRefreshCw } from "react-icons/lu";

interface ProductResponse {
  data: any;
}

const ProductsCard = () => {
  const router = useRouter();
  const [products, setProducts] = useState<any>([]);
  const localHost = process.env.NEXT_PUBLIC_LOCALHOSTBE;

  useEffect(() => {
    axios.get<ProductResponse>(`${localHost}/api/product-list`).then((res) => {
      setProducts(res.data?.data);
    });
  }, [router]);

  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState<number | "">("");
  const [description, setDescription] = useState("");
  const [qty, setQty] = useState<number | "">("");
  const [image, setImage] = useState("");
  const [message, setMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [editProduct, setEditProduct] = useState(false);
  const [ID, setID] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    try {
      const res = await axios.post(`${localHost}/api/product`, {
        name,
        category,
        price,
        description,
        qty,
        image,
      });

      if (res.status === 200) {
        setMessage((res.data as { message: string }).message);
      }
    } catch (error: any) {
      console.log(error);
      setMessage(error.response.data.message);
    }
  };

  const handleDelete = async (productName: string) => {
    try {
      const res = await axios.delete(`${localHost}/api/product/${productName}`);
      if (res.status === 200) {
        const data = res.data as { message: string };
        setSuccessMessage(data.message);
      }
    } catch (error) {
      console.log(error);
      setSuccessMessage("Failed to delete product");
    }
  };

  const handleEdit = async (id: string) => {
    try {
      const res = await axios.put(`${localHost}/api/product/${id}`, {
        name,
        category,
        price,
        description,
        qty,
        image,
      });

      if (res.status === 200) {
        setMessage((res.data as { message: string }).message);
      }
    } catch (error: any) {
      console.log();
      setMessage(error.response.data.message);
    }
  };

  return (
    <div className={`w-full h-fit pt-5 flex justify-between`}>
      <div
        className={`w-[62%] h-fit bg-white rounded-2xl shadow-md p-5 flex flex-col`}
      >
        <div className={`flex items-center justify-between`}>
          <h1 className={`text-lg font-semibold`}>All Product</h1>
          <LuRefreshCw
            onClick={() => window.location.reload()}
            className={`cursor-pointer`}
          />
        </div>
        <div className="">{successMessage}</div>

        <div className={`flex flex-wrap gap-4 justify-between pt-3`}>
          {products.map((item: any) => {
            return (
              <>
                {" "}
                <div
                  className={`w-[49%] h-[90px] flex items-center pt-2 pb-2 pl-2 pr-2 border-2 rounded-xl`}
                >
                  <div className={`w-[80px] h-full relative`}>
                    <Image
                      src={item.image}
                      alt={`product`}
                      fill
                      className={`absolute rounded-xl`}
                    ></Image>
                  </div>
                  <div
                    className={`font-bold text-[15px] flex items-center justify-between w-full pl-2 `}
                  >
                    <div className="">
                      <h1>{item.name}</h1>
                      <p className={`text-[#1253d2]`}>
                        {item.price.toLocaleString("id-ID", {
                          style: "currency",
                          currency: "IDR",
                        })}
                      </p>
                      <p
                        className={`font-normal text-[12px] pt-1 break-words whitespace-normal`}
                      >
                        {item.description}
                      </p>
                    </div>

                    <div className={`flex flex-col items-end gap-0.5`}>
                      <div className={`flex items-center gap-1`}>
                        <BiSolidCategoryAlt size={17} />
                        <p className={``}>{item.category}</p>
                      </div>
                      <div className={`flex gap-1 pl-1`}>
                        <Button
                          className={`w-10 h-7 text-[10px] rounded-full bg-[#1253d2] cursor-pointer`}
                          onClick={() => {
                            setName(item.name);
                            setCategory(item.category);
                            setPrice(item.price);
                            setDescription(item.description);
                            setQty(item.qty);
                            setImage(item.image);
                            setEditProduct(true);
                            setID(item._id);
                          }}
                        >
                          Edit
                        </Button>
                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <Button
                              className={`w-13 h-7 text-[10px] rounded-full bg-red-500 cursor-pointer`}
                            >
                              Delete
                            </Button>
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>
                                Are you sure about deleting this product?
                              </AlertDialogTitle>
                              <AlertDialogDescription>
                                This action cannot be undone. This will
                                permanently delete your product and remove your
                                data from our servers.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>Cancel</AlertDialogCancel>
                              <AlertDialogAction
                                onClick={() => {
                                  handleDelete(item.name);
                                  window.location.reload();
                                }}
                                className={`cursor-pointer`}
                              >
                                Continue
                              </AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                      </div>
                    </div>
                  </div>
                </div>
              </>
            );
          })}
        </div>
      </div>
      <div
        className={`w-[35%] h-fit bg-white rounded-2xl shadow-md pt-5 pr-5 pl-5 pb-5`}
      >
        <div className={`text-lg font-semibold`}>
          {editProduct ? "Edit Product" : "Add New Product"}
        </div>

        <div className={`pt-5`}>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              if (editProduct) {
                handleEdit(ID);
              } else {
                handleSubmit(e);
              }
            }}
            className={`flex flex-col gap-5`}
          >
            <div className={`flex flex-col gap-1`}>
              <h1 className={`text-[13px] font-semibold`}>Product Name</h1>
              <Input
                type="text"
                placeholder="ex: bergmund"
                autoComplete="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className={`flex flex-col gap-1`}>
              <h1 className={`text-[13px] font-semibold`}>Category</h1>
              <Input
                type="text"
                placeholder="ex: Furniture"
                autoComplete="on"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              />
            </div>
            <div className={`flex flex-col gap-1`}>
              <h1 className={`text-[13px] font-semibold`}>Price</h1>
              <Input
                type="text"
                placeholder="ex: 150000"
                autoComplete="on"
                value={price}
                onChange={(e) => setPrice(Number(e.target.value))}
              />
            </div>
            <div className={`flex flex-col gap-1`}>
              <h1 className={`text-[13px] font-semibold`}>Description</h1>
              <Input
                type="text"
                placeholder="ex: Kursi, Putih"
                autoComplete="on"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>
            <div className={`flex flex-col gap-1`}>
              <h1 className={`text-[13px] font-semibold`}>Qty</h1>
              <Input
                type="number"
                placeholder="ex: 1"
                autoComplete="on"
                value={qty}
                onChange={(e) => setQty(Number(e.target.value))}
              />
            </div>
            <div className={`flex flex-col gap-1`}>
              <h1 className={`text-[13px] font-semibold`}>Image</h1>
              <Input
                type="text"
                placeholder="Note : use link cloud!"
                autoComplete="on"
                value={image}
                onChange={(e) => setImage(e.target.value)}
              />
            </div>
            {message && (
              <Alert className="border border-blue-500">
                <AlertTitle className={`font-semibold`}>{message}</AlertTitle>
              </Alert>
            )}
            <div className={`w-full flex justify-end pt-3`}>
              <Button
                className={`w-1/3 bg-[#1253d2] cursor-pointer`}
                type="submit"
              >
                {editProduct ? "Edit" : "Add"}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ProductsCard;
