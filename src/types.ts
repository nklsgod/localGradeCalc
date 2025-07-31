export interface Module {
  moduleNumber: string;
  moduleName: string;
  moduleECTS: 3 | 5 | 6 | 9 | 10 | 15;
  isFirstOrSecondYear?: boolean;
  grade: number;
  modulePool: string;
}
