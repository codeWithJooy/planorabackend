const Vendors = require("../models/vendors");

exports.registerVendor = async (req, res) => {
  try {
    const { vendorName, vendorPhone, vendorAlternative, vendorEmail,orgId } = req.body;

    const existingVendor = await Vendors.findOne({ vendorEmail });
    if (existingVendor) {
      return res.status(400).json({
        code: 400,
        message: "Vendor Already Present"
      });
    }

    const newVendor = await Vendors.create({
      vendorName,
      vendorPhone,
      vendorAlternative,
      vendorEmail,
      orgId
    });

    return res.status(201).json({
      code: 201,
      message: "Vendor Added Successfully",
      vendor: newVendor,
    });

  } catch (error) {
    return res.status(500).json({ code: 500, message: error.message });
  }
};

exports.getVendors = async (req, res) => {
  try {
    const vendors = await Vendors.find();
    return res.status(200).json({
      code: 200,
      message: "Vendors List Fetched",
      vendors,
    });
  } catch (error) {
    return res.status(500).json({ code: 500, message: error.message });
  }
};
