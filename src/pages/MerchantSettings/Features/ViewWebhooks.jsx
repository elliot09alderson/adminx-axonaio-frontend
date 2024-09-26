import { useSelector, useDispatch } from "react-redux";
import { useEffect, useRef, useState } from "react";
import { Button } from "../../../components/Buttons/Buttons";
import { Modal, Label, TextInput, Dropdown } from "flowbite-react";

import { fetchWebhooks } from "../../../rtk/slices/merchantSettingSlice/merchantSettingSlice";

const ViewWebhooks = () => {
  const dispatch = useDispatch();

  const [app, setApp] = useState("payin");
  const [mode, setMode] = useState("test");
  const [merchantId, setMerchantId] = useState("");
  const [openModal, setOpenModal] = useState(false);
  const [selectResellerAdmin, setSelectResellerAdmin] = useState("");

  const { merchants } = useSelector((slice) => slice.merchant);
  const { payinwebhooks, payinapikeys, loader } = useSelector(
    (slice) => slice.merchantsettings
  );

  return (
    <div className="flex gap-8 flex-col min-h-screen">
      <div className="flex items-center justify-between gap-8 mt-4">
        <select
          id="merchant"
          name="merchant"
          onChange={(e) => setMerchantId(e.target.value)}
          className="rounded-lg cursor-pointer dark:bg-slate-800 text-center bg-day shadow-sm w-64 font-semibold px-4 py-3 dark:text-white"
        >
          <option value="" label="select merchant" />
          {merchants.map((item, idx) => (
            <option key={idx} value={item.m_id} label={item.name} />
          ))}
        </select>
        <select
          id="mode"
          name="mode"
          onChange={(e) => setMode(e.target.value)}
          className="rounded-lg cursor-pointer dark:bg-slate-800 text-center bg-day shadow-sm w-64 font-semibold px-4 py-3 dark:text-white"
        >
          {/* <option value="" label="select Mode " /> */}
          <option value="live" label="live" />
          <option value="test" label="test" />
        </select>
        <select
          id="app"
          name="app"
          onChange={(e) => setApp(e.target.value)}
          className="rounded-lg cursor-pointer dark:bg-slate-800 text-center bg-day shadow-sm w-64 font-semibold px-4 py-3 dark:text-white"
        >
          {/* <option value="" label="Set App" /> */}
          <option value="payin" label="Payin" />
          <option value="payout" label="Payout" />
        </select>
        <Button
          className="text-center py-3 rounded-lg bg-day"
          style={{ background: "#9fd3c7", width: "300px" }}
          onClick={() => {
            setOpenModal(true);
            dispatch(fetchWebhooks({ datax: { mode, app, merchantId } }));
          }}
        >
          Get Webhook url
        </Button>
      </div>

      <Modal
        show={openModal}
        size="md"
        popup
        onClose={() => setOpenModal(false)}
        className="outline-none"
        initialFocus={useRef()}
      >
        <Modal.Header>
          <h1 className="lg:text-2xl dark:text-white my-4 mb-6 ml-4">
            Webhooks
          </h1>
        </Modal.Header>

        <div className="flex flex-col gap-4 pb-8 ">
          {["localhost:5000", "http://youtube.com", "http://pinterest.com"].map(
            (item, idx) => (
              <div key={idx + "B"} className="flex flex-col gap-1 px-4">
                <input
                  id="merchant"
                  value={item}
                  name="resellerId"
                  className="rounded-lg h-12 pl-2"
                />
              </div>
            )
          )}
        </div>
      </Modal>
    </div>
  );
};

export default ViewWebhooks;
