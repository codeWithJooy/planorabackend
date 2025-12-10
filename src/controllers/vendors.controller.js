const Vendors = require("../models/vendors");

exports.registerVendor = async (req, res) => {
  try {
    const { vendorName, vendorPhone, vendorAlternative, vendorEmail,orgId,vendorCategory } = req.body;

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
      orgId,
      vendorCategory
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

exports.getVendorsByOrgId = async (req, res) => {
  try {
    const { orgId } = req.params;

    const vendors= await Vendors.find({ orgId: orgId.toString() });

    return res.status(200).json({
      code: 200,
      message: "Vendors fetched successfully",
      vendors,
    });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};
