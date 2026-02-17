import mongoose from 'mongoose';

const ProjectSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    images: {
        type: [String],
        default: [],
    },
    technologies: {
        type: [String],
        default: [],
    },
    clientName: {
        type: String,
    },
    projectLink: {
        type: String,
    },
    category: {
        type: String,
        required: true,
    },
    featured: {
        type: Boolean,
        default: false,
    },
}, {
    timestamps: true,
});

export default mongoose.models.Project || mongoose.model('Project', ProjectSchema);
