import Sidebar from "@/Comp/Commons/Sidebar";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { CgLogOut } from "react-icons/cg";
import { FaRegUser } from "react-icons/fa";
import { IoSearch } from "react-icons/io5";
import { LuRefreshCw } from "react-icons/lu";

type JWTPayload = {
  exp: number;
  iat: number;
  id: string;
  username: string;
};

interface Payment {
  redirect_url: string;
}

const Transaction = () => {
  const invoices = [
    {
      invoice: "INV001",
      paymentStatus: "Paid",
      totalAmount: "$250.00",
      paymentMethod: "Credit Card",
    },
    {
      invoice: "INV002",
      paymentStatus: "Pending",
      totalAmount: "$150.00",
      paymentMethod: "PayPal",
    },
    {
      invoice: "INV003",
      paymentStatus: "Unpaid",
      totalAmount: "$350.00",
      paymentMethod: "Bank Transfer",
    },
    {
      invoice: "INV004",
      paymentStatus: "Paid",
      totalAmount: "$450.00",
      paymentMethod: "Credit Card",
    },
    {
      invoice: "INV005",
      paymentStatus: "Paid",
      totalAmount: "$550.00",
      paymentMethod: "PayPal",
    },
    {
      invoice: "INV006",
      paymentStatus: "Pending",
      totalAmount: "$200.00",
      paymentMethod: "Bank Transfer",
    },
    {
      invoice: "INV007",
      paymentStatus: "Unpaid",
      totalAmount: "$300.00",
      paymentMethod: "Credit Card",
    },
  ];

  const router = useRouter();
  const localHost = process.env.NEXT_PUBLIC_LOCALHOSTBE;
  const [username, setUsername] = useState("");
  const [product, setProduct] = useState<any>([]);
  const [cartProduct, setCartProduct] = useState<any>([]);
  const [cartProductArray, setCartProductArray] = useState<any>([]);
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    try {
      axios.get(`${localHost}/api/product-list`).then((res) => {
        setProduct(res.data);
      });
    } catch (error) {
      console.log(error);
    }
    setUsername(localStorage.getItem("username") || "");
  }, [router]);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      router.push("/auth/login");
      return;
    }

    try {
      const decoded = jwtDecode<JWTPayload>(token);
      const now = Date.now() / 1000;

      if (decoded.exp < now) {
        localStorage.removeItem("token");
        router.push("/auth/login");
      }
    } catch (err) {
      console.error("Token tidak valid:", err);
      localStorage.removeItem("token");
      router.push("/auth/login");
    }
  }, [router]);

  const handleAddToCart = (id: string) => {
    const existingItem = cartProduct.find((item: any) => item.id === id);
    if (existingItem) {
      setCartProduct(
        cartProduct.map((item: any) =>
          item.id === id
            ? {
                ...item,
                qty: item.qty + 1,
              }
            : item
        )
      );
    } else {
      setCartProduct([...cartProduct, { id, qty: 1 }]);
    }
  };

  useEffect(() => {
    if (cartProduct.length === 0) return;

    Promise.all(
      cartProduct.map((element: { id: string; qty: number }) =>
        axios
          .get(`${localHost}/api/product-list/product/${element.id}`)
          .then((res) => ({
            ...(res.data as { [key: string]: any }),
            qty: element.qty,
          }))
      )
    ).then((products) => {
      setCartProductArray(products);
    });
  }, [cartProduct]);

  const handleRemoveFromCart = (id: string) => {
    console.log("Remove:", id);

    setCartProductArray((prev: any) =>
      prev.filter((item: any) => item.data._id !== id)
    );
  };

  const buildPayload = () => {
    const products = cartProductArray.map((item: any) => ({
      productId: item.data._id,
      name: item.data.name,
      price: item.data.price,
      qty: item.qty,
    }));

    const total = products.reduce(
      (acc: number, p: any) => acc + p.price * p.qty,
      0
    );

    return { products, total };
  };

  // console.log(cartProductArray);
  // console.log(totalPrice);

  return (
    <div className={`w-full min-h-screen bg-[#ebebeb] flex`}>
      <Sidebar></Sidebar>
      <div className={`w-full pr-7 pl-7`}>
        <div className={`pt-7 w-full flex justify-between`}>
          <div
            className={`w-[70%] h-20 bg-white rounded-3xl flex items-center p-5 shadow-md justify-between`}
          >
            <h1 className={`text-2xl font-bold`}>Transaction</h1>
            <div
              className={`bg-[#ebebeb] p-2 rounded-full flex items-center justify-center cursor-pointer`}
            >
              <IoSearch size={27} />
            </div>
          </div>

          <div
            className={`w-[28%] h-20 bg-white rounded-3xl shadow-md flex items-center justify-between p-5`}
          >
            <div className={`flex items-center gap-3`}>
              <Avatar>
                <AvatarImage
                  src="https://github.com/shadcn.png"
                  alt="@shadcn"
                />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>

              <div className={`flex flex-col`}>
                <h1 className={`font-bold`}>{username}</h1>

                <div className={`flex items-center gap-1`}>
                  <FaRegUser size={14} />
                  <p className={`font-sm`}>Member</p>
                </div>
              </div>
            </div>

            <CgLogOut
              size={27}
              color="red"
              className={`cursor-pointer`}
              onClick={() => {
                router.push(`/auth/login`);
                localStorage.removeItem("token");
                localStorage.removeItem("username");
              }}
            />
          </div>
        </div>

        <div className={`w-full h-fit pt-5 flex justify-between`}>
          <div
            className={`w-[62%] h-fit bg-white rounded-2xl shadow-md p-5 flex flex-col gap-5`}
          >
            <div className="">
              <h1 className={`text-lg font-semibold`}>All Product</h1>
            </div>
            <div className={`flex justify-between gap-2 flex-wrap`}>
              {product?.data?.map((item: any) => (
                <div
                  className={`w-[49%] h-[90px] border-2 p-2 rounded-xl flex ${
                    item.qty === 0 ? "border-red-500" : ""
                  } items-center`}
                >
                  <div className={`w-[80px] h-full relative`}>
                    <Image
                      src={item.image}
                      alt={`product`}
                      fill
                      className={`absolute rounded-xl`}
                    />
                  </div>

                  <div className={`flex items-center justify-between w-full`}>
                    <div className={`font-bold text-[15px] pl-2`}>
                      <h1>{item.name}</h1>
                      <p className={`text-[#1253d2]`}>
                        {item.price.toLocaleString("id-ID", {
                          style: "currency",
                          currency: "IDR",
                        })}
                      </p>
                      <p
                        className={`text-[12px] pt-1 break-words whitespace-normal ${
                          item.qty === 0
                            ? "text-red-500 font-bold"
                            : "font-normal"
                        }`}
                      >
                        {item.qty === 0 ? "Out of stock" : item.description}
                      </p>
                    </div>

                    <div className="">
                      <Button
                        className={`w-13 h-7 text-[10px] rounded-full bg-[#1253D2] cursor-pointer pl-10 pr-10`}
                        disabled={item.qty === 0}
                        onClick={() => {
                          handleAddToCart(item._id);
                          setTotalPrice((prev) => prev + item.price);
                        }}
                      >
                        Add to cart
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div
            className={`w-[35%] h-fit bg-white rounded-2xl shadow-md pt-5 pr-5 pl-5 pb-5`}
          >
            <Table>
              <TableCaption>A cart of your recent purchases.</TableCaption>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[100px]">Product</TableHead>
                  <TableHead>Qty</TableHead>
                  <TableHead className="text-right">Price</TableHead>
                  <TableHead className="text-right">Total Price</TableHead>
                  <TableHead className="text-right flex items-center justify-end">
                    <LuRefreshCw
                      onClick={() => window.location.reload()}
                      className={`cursor-pointer`}
                    />
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {cartProductArray.map((item: any) => (
                  <TableRow key={item._id}>
                    <TableCell className="font-medium">
                      {item.data.name}
                    </TableCell>
                    <TableCell>{item.qty}</TableCell>
                    <TableCell className="text-right">
                      {item.data.price.toLocaleString("id-ID", {
                        style: "currency",
                        currency: "IDR",
                      })}
                    </TableCell>
                    <TableCell className="text-right">
                      {(item.data.price * item.qty).toLocaleString("id-ID", {
                        style: "currency",
                        currency: "IDR",
                      })}
                    </TableCell>
                    <TableCell>
                      <Button
                        className={`bg-red-600 h-[20px] rounded-full cursor-pointer`}
                        onClick={() => handleRemoveFromCart(item?.data?._id)}
                      >
                        -
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
              <TableFooter>
                <TableRow>
                  <TableCell colSpan={3}>Total</TableCell>
                  <TableCell className="text-right">
                    {totalPrice?.toLocaleString("id-ID", {
                      style: "currency",
                      currency: "IDR",
                    })}
                  </TableCell>
                  <TableCell>
                    <Button
                      className={`h-[20px] rounded-full cursor-pointer text-[10px]`}
                      onClick={async () => {
                        const payload = buildPayload();
                        console.log(payload);

                        const res = await axios.post(
                          `${localHost}/api/payment`,
                          payload
                        );

                        const redirectUrl = (
                          res?.data as { data: { payment: Payment } }
                        )?.data?.payment?.redirect_url;
                        if (redirectUrl) {
                          window.open(redirectUrl, "_blank"); // buka di tab baru
                        } else {
                          console.error(
                            "Redirect URL tidak ditemukan di response"
                          );
                        }
                      }}
                    >
                      Pay
                    </Button>
                  </TableCell>
                </TableRow>
              </TableFooter>
            </Table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Transaction;
