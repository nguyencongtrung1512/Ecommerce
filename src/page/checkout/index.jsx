import { useState } from "react";
import "./index.scss";

function Checkout() {
  const [cardType, setCardType] = useState("Visa");
  const [creditCardImage, setCreditCardImage] = useState(
    "https://dl.dropboxusercontent.com/s/ubamyu6mzov5c80/visa_logo%20%281%29.png"
  );
  const [dropdownVisible, setDropdownVisible] = useState(false);

  const handleCardSelection = (card) => {
    if (card === "Master Card") {
      setCreditCardImage(
        "https://dl.dropboxusercontent.com/s/2vbqk5lcpi7hjoc/MasterCard_Logo.svg.png"
      );
    } else if (card === "American Express") {
      setCreditCardImage(
        "https://dl.dropboxusercontent.com/s/f5hyn6u05ktql8d/amex-icon-6902.png"
      );
    } else {
      setCreditCardImage(
        "https://dl.dropboxusercontent.com/s/ubamyu6mzov5c80/visa_logo%20%281%29.png"
      );
    }
    setCardType(card);
    setDropdownVisible(false);
  };

  const [formData, setFormData] = useState({
    cardHolder: '',
    cardNumber: '',
    expires: '',
    cvc: ''
  });

  const [errors, setErrors] = useState({
    cardHolder: '',
    cardNumber: '',
    expires: '',
    cvc: ''
  });

  const validate = () => {
    let valid = true;
    let newErrors = {};

    // Card Holder validation
    if (!formData.cardHolder) {
      newErrors.cardHolder = 'Please enter card holder name';
      valid = false;
    }

    // Card Number validation (ensure it's numeric and has 16 digits)
    if (!formData.cardNumber || formData.cardNumber.length !== 16 || isNaN(formData.cardNumber)) {
      newErrors.cardNumber = 'Please enter a valid 16-digit card number';
      valid = false;
    }

    // Expires validation (basic validation, you can extend it)
    if (!formData.expires) {
      newErrors.expires = 'Please enter expiration date';
      valid = false;
    }

    // CVC validation (ensure it's 3-4 digits)
    if (!formData.cvc || formData.cvc.length < 3 || formData.cvc.length > 4 || isNaN(formData.cvc)) {
      newErrors.cvc = 'Please enter a valid CVC';
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      // Submit form or perform further actions
      console.log("Form is valid, submitting:", formData);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setErrors({ ...errors, [name]: '' });  // Reset errors when typing
  };

  return (
    <div className="container">
      <div className="window">
        <div className="order-info">
          <div className="order-info-content">
            <h2>Order Summary</h2>
            <div className="line"></div>
            <table className="order-table">
              <tbody>
                <tr>
                  <td>
                    <img
                      src="https://dl.dropboxusercontent.com/s/sim84r2xfedj99n/%24_32.JPG"
                      className="full-width"
                      alt="Nike Shoes"
                    />
                  </td>
                  <td>
                    <br />
                    <span className="thin">Nike</span>
                    <br /> Free Run 3.0 Women
                    <br />
                    <span className="thin small">
                      {" "}
                      Color: Grey/Orange, Size: 10.5
                      <br />
                      <br />
                    </span>
                  </td>
                </tr>
                <tr>
                  <td>
                    <div className="price">$99.95</div>
                  </td>
                </tr>
              </tbody>
            </table>

            <div className="line"></div>

            <table className="order-table">
              <tbody>
                <tr>
                  <td>
                    <img
                      src="https://dl.dropboxusercontent.com/s/qbj9tsbvthqq72c/Vintage-20L-Backpack-by-Fj%C3%A4llr%C3%A4ven.jpg"
                      className="full-width"
                      alt="Vintage Backpack"
                    />
                  </td>
                  <td>
                    <br />
                    <span className="thin">Fjällräven</span>
                    <br />
                    Vintage Backpack
                    <br />
                    <span className="thin small">
                      {" "}
                      Color: Olive, Size: 20L
                    </span>
                  </td>
                </tr>
                <tr>
                  <td>
                    <div className="price">$235.95</div>
                  </td>
                </tr>
              </tbody>
            </table>

            <div className="line"></div>

            <table className="order-table">
              <tbody>
                <tr>
                  <td>
                    <img
                      src="https://dl.dropboxusercontent.com/s/nbr4koso8dpoggs/6136C1p5FjL._SL1500_.jpg"
                      className="full-width"
                      alt="Monobento Lunchbox"
                    />
                  </td>
                  <td>
                    <br />
                    <span className="thin">Monobento</span>
                    <br />
                    Double Lunchbox
                    <br />
                    <span className="thin small">
                      {" "}
                      Color: Pink, Size: Medium
                    </span>
                  </td>
                </tr>
                <tr>
                  <td>
                    <div className="price">$25.95</div>
                  </td>
                </tr>
              </tbody>
            </table>

            <div className="line"></div>
            <div className="total">
              <span style={{ float: "left" }}>
                <div className="thin dense">VAT 19%</div>
                <div className="thin dense">Delivery</div>
                TOTAL
              </span>
              <span style={{ float: "right", textAlign: "right" }}>
                <div className="thin dense">$68.75</div>
                <div className="thin dense">$4.95</div>
                $435.55
              </span>
            </div>
          </div>
        </div>

        <div className="credit-info">
          <div className="credit-info-content">
            <table className="half-input-table">
              <tbody>
                <tr>
                  <td>Please select your card: </td>
                  <td>
                    <div
                      className="dropdown"
                      id="card-dropdown"
                      onClick={() => setDropdownVisible(!dropdownVisible)}
                    >
                      <div className="dropdown-btn" id="current-card">
                        {cardType}
                      </div>
                      {dropdownVisible && (
                        <div className="dropdown-select visible">
                          <ul>
                            <li onClick={() => handleCardSelection("Visa")}>
                              Visa
                            </li>
                            <li
                              onClick={() =>
                                handleCardSelection("Master Card")
                              }
                            >
                              Master Card
                            </li>
                            <li
                              onClick={() =>
                                handleCardSelection("American Express")
                              }
                            >
                              American Express
                            </li>
                          </ul>
                        </div>
                      )}
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>

            <img
              src={creditCardImage}
              height="80"
              className="credit-card-image"
              id="credit-card-image"
              alt="Credit Card"
            />

            <form onSubmit={handleSubmit}>
              <div>
                <label>Card Holder</label>
                <input
                  className="input-field"
                  type="text"
                  name="cardHolder"
                  value={formData.cardHolder}
                  onChange={handleChange}
                />
                {errors.cardHolder && <span className="error">{errors.cardHolder}</span>}
              </div>

              <div>
                <label>Card Number</label>
                <input
                  className="input-field"
                  type="text"
                  name="cardNumber"
                  value={formData.cardNumber}
                  onChange={handleChange}
                />
                {errors.cardNumber && <span className="error">{errors.cardNumber}</span>}
              </div>

              <div className="input-field-CVC">
                <label>Expires</label>
                <input
                 className="input-field"
                  type="text"
                  name="expires"
                  value={formData.expires}
                  onChange={handleChange}
                />
                {errors.expires && <span className="error">{errors.expires}</span>}
                <label>CVC</label>
                <input
                  className="input-field"
                  type="text"
                  name="cvc"
                  value={formData.cvc}
                  onChange={handleChange}
                />
                {errors.cvc && <span className="error">{errors.cvc}</span>}
              </div>
              <button type="submit" className="pay-btn">Checkout</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Checkout;
