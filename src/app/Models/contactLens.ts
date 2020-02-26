

export class ContactLensModel
{
   Company : string;
   Prescription : string;
   Date:Date;
   Professional:string;
   Patient:string;
   Exam:string;
   LabInvoiceNo:number;
   TrayNumber:number;

   Rx_OD_Sphere:number;
   Rx_OD_Cylinder:number;
   Rx_OD_Axis:number;
   Rx_OD_Addition:number;
   Rx_OD_Segh:number;
   Rx_OD_OZ:number;

   Rx_OS_Sphere:number;
   Rx_OS_Cylinder:number;
   Rx_OS_Axis:number;
   Rx_OS_Addition:number;
   Rx_OS_Segh:number;
   Rx_OS_OZ:number;

   Rx_OD_Base1:number;
   Rx_OD_Base2:number;
   Rx_OD_Horiz:number;
   Rx_OD_Vert:number;
   Rx_OS_Base1:number;
   Rx_OS_Base2:number;
   Rx_OS_Horiz:number;
   Rx_OS_Vert:number;


   //Keratometry

   //next div

   OD_Pupilsize:string;
   OD_Cornealsize:string;
   OD_TypeOfTears:string;
   OD_BUT:string;
   OD_Centration:string;
   OD_MouvementOfTheLens:string;
   OD_VisualAcuityFar:string;
   OD_VisualAcuityClose:string;

   OS_Pupilsize:string;
   OS_Cornealsize:string;
   OS_TypeOfTears:string;
   OS_BUT:string;
   OS_Centration:string;
   OS_MouvementOfTheLens:string;
   OS_VisualAcuityFar:string;
   OS_VisualAcuityClose:string;

   //Contact Lens

   Ready:string;
   AdviceClient:string;
   FollowUp:string;
   DateCalled:string;
   DeliveryDate:string;
   Notes:string;
   ProfessionalFees:string;
   Total:string;


}