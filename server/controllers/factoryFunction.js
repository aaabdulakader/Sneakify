const catchAsync = require("./../catchAsync");

exports.getOne = (Model) =>
  catchAsync(async (req, res, next) => {
    const document = await Model.findById(req.params.id);

    if (!document) {
      return next(`No ${Model.modelName} found with that ID`);
    }
    res.status(200).json({
      status: "success",
      document,
    });
  });

exports.getAll = (Model) =>
  catchAsync(async (req, res, next) => {
    const documents = await Model.find();

    if (!documents) {
      return next("No documents found");
    }

    res.status(200).json({
      status: "success",
      results: documents.length,
      documents,
    });
  });

exports.createOne = (Model) =>
  catchAsync(async (req, res, next) => {
    const document = await Model.create(req.body);

    res.status(201).json({
      status: "success",
      document,
    });
  });

exports.updateOne = (Model) =>
  catchAsync(async (req, res, next) => {
    const document = await Model.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!document) {
      return next(`No ${Model.modelName} found with that ID`);
    }

    res.status(200).json({
      status: "success",
      document,
    });
  });

exports.deleteOne = (Model) =>
  catchAsync(async (req, res, next) => {
    const document = await Model.findByIdAndDelete(req.params.id);

    if (!document) {
      return next(`No ${Model.modelName} found with that ID`);
    }

    res.status(204).json({
      status: "success",
      document: null,
    });
  });
