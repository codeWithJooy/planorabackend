const TemplateFieldSchema = new mongoose.Schema({
    label: { type: String, required: true },
    fieldKey: { type: String, required: true },
    type: { type: String, required: true }, // text, number, dropdown, multi-select, file, textarea, datetime
    required: { type: Boolean, default: false },
    options: { type: [String], default: [] } // for dropdown/multi-select
  });
  
  const TemplateSchema = new mongoose.Schema(
    {
      templateId: {
        type: String,
        required: true,
        unique: true
      },
  
      orgId: {
        type: String,
        required: true
      },
  
      templateName: {
        type: String,
        required: true
      },
  
      description: {
        type: String,
        default: ""
      },
  
      version: {
        type: Number,
        default: 1
      },
  
      fields: [TemplateFieldSchema]
    },
    { timestamps: true }
  );
  
  module.exports = mongoose.model("Template", TemplateSchema);
  