import mongoose from 'mongoose';

const { MONGO_URI } = process.env;

const connect = (): Promise<typeof mongoose> =>
	mongoose.connect(MONGO_URI, {
		useNewUrlParser: true,
		useCreateIndex: true,
		useFindAndModify: false,
		useUnifiedTopology: true,
	});

export { connect };
