const Vendors = require("../models/vendors");

exports.getVendorsDropdown = async (req, res) => {
  try {
    const vendors = await Vendors.find().select("vendorId vendorName");
    const dropdown = vendors.map((vendor) => ({
      value: vendor.vendorId,
      label: vendor.vendorName,
    }));
    return res.status(200).json({
      code: 200,
      message: "Vendors List Fetched",
      vendors: dropdown,
    });
  } catch (error) {
    return res.status(500).json({ code: 500, message: error.message });
  }
};
