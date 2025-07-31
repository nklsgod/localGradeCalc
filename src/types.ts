export interface Module {
  moduleNumber: string;
  moduleName: string;
  moduleECTS: 3 | 6 | 9;
  isFirstOrSecondYear?: boolean;
  grade: number;
  modulePool: string;
}