/**
 * The mint envelope flap with the wax seal at its tip, shown at the top of
 * each page. `size="large"` is used on the home page and plays a short
 * "stamp" animation when the page loads.
 */
export default function EnvelopeFlap({ size = "small" }: { size?: "large" | "small" }) {
  return (
    <div className={size === "small" ? "flap flap-small" : "flap"} aria-hidden="true">
      <div className="flap-shape" />
      <img
        className={size === "large" ? "flap-seal stamp" : "flap-seal"}
        src="/images/site/seal.png"
        alt=""
      />
    </div>
  );
}
