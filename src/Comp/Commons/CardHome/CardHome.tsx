import axios from "axios";
import { useEffect, useState } from "react";
import { FaMoneyCheckAlt } from "react-icons/fa";
import { IoIosPricetags } from "react-icons/io";
import { RiShoppingBasketFill } from "react-icons/ri";

const CardHome = () => {
  const localHost = process.env.NEXT_PUBLIC_LOCALHOSTBE;
  const [produk, setProduk] = useState<any>([]);

  useEffect(() => {
    try {
      axios.get(`${localHost}/api/product-list`).then((res) => {
        setProduk(res.data);
      });
    } catch (error) {
      console.log(error);
    }
  }, []);

  const totalPrice = produk?.data?.reduce(
    (acc: number, item: any) => acc + item.price,
    0
  );

  const kategori = [
    ...new Set(produk?.data?.map((item: any) => item.category)),
  ];

  const totalKategori = kategori.length;

  return (
    <div className={`pt-5 flex justify-between gap-2`}>
      <div className="w-[32%] h-[170px] bg-white rounded-2xl shadow-md p-5 flex flex-col justify-centerx">
        <div className={`p-3 bg-[#def4fb] w-fit rounded-full`}>
          <IoIosPricetags size={25} color={`#164cc6`} />
        </div>
        <h1 className={`text-xl font-bold pt-3`}>{produk?.data?.length}</h1>
        <p className={`text-sm pt-1`}>Total Product</p>
      </div>

      <div className="w-[32%] h-[170px] bg-white rounded-2xl shadow-md p-5 flex flex-col justify-center">
        <div className={`p-3 bg-[#def4fb] w-fit rounded-full`}>
          <FaMoneyCheckAlt size={25} color={`#164cc6`} />
        </div>
        <h1 className={`text-xl font-bold pt-3`}>
          {totalPrice !== undefined
            ? totalPrice.toLocaleString("id-ID", {
                style: "currency",
                currency: "IDR",
              })
            : "Rp 0,00"}
        </h1>
        <p className={`text-sm pt-1`}>Total Price</p>
      </div>

      <div className="w-[32%] h-[170px] bg-white rounded-2xl shadow-md p-5 flex flex-col justify-center">
        <div className={`p-3 bg-[#def4fb] w-fit rounded-full`}>
          <RiShoppingBasketFill size={25} color={`#164cc6`} />
        </div>
        <h1 className={`text-xl font-bold pt-3`}>{totalKategori}</h1>
        <p className={`text-sm pt-1`}>Total Category</p>
      </div>
    </div>
  );
};
export default CardHome;
