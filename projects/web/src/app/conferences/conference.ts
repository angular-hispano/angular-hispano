export interface Conference {
  name: string;
  logoUrl: string;
  logoType: 'svg' | string;
  dateString: string;
  siteUrl: string | null;
  ticketsUrl: string | null;
  cfpUrl: string | null;
  country: string;
  city: string;
}
