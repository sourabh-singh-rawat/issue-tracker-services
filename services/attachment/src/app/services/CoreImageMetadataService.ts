import { Queue } from "bullmq";
import { ImageMetadataService } from "./interfaces";

export class CoreImageMetadataService implements ImageMetadataService {
  constructor(private readonly queue: Queue) {}
}
