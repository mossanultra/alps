export interface Vertex {
    x?: number;
    y?: number;
  }
  
  export   interface BoundingPoly {
    vertices: Vertex[];
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    normalizedVertices?: any[];
  }
  
  export   interface TextAnnotation {
    description: string | undefined;
    boundingPoly: BoundingPoly;
  }
  
  export   interface VisionResponse {
    textAnnotations: TextAnnotation[];
  }
  
  // 種目（エクササイズ）グループの型定義
  export interface ExerciseGroup {
    name: string;
    sets: { weight: string; reps: string }[];
  }
  