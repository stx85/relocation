import { type Locator, type Page } from '@playwright/test';

export class PlaywrightDevPage {
    readonly page: Page;
    readonly getClientName: Locator;
    readonly getRelocationdate: Locator;
    readonly getRelocationtime: Locator;
    readonly getCityfrom: Locator;
    readonly getZipfrom: Locator;
    readonly getStreetfrom: Locator;
    readonly getFloorfrom: Locator;
    readonly getElevatorfrom: Locator;
    readonly getCityto: Locator;
    readonly getZipto: Locator;
    readonly getStreetto: Locator;
    readonly getFloorto: Locator;
    readonly getElevatorto: Locator;
    readonly getPackagingservice: Locator;
    readonly getSendbutton: Locator;

    constructor(page: Page) {
        this.page = page;
        
        this.getClientName = page.getByTestId('clientname');
        this.getRelocationdate = page.getByTestId('relocationdate');
        this.getRelocationtime = page.getByTestId('relocationtime');
        this.getCityfrom = page.getByTestId('cityfrom');
        this.getZipfrom = page.getByTestId('zipfrom');
        this.getStreetfrom = page.getByTestId('streetfrom');
        this.getFloorfrom = page.getByTestId('floorfrom');
        this.getElevatorfrom = page.getByTestId('elevatorfrom').getByRole('checkbox');
        this.getCityto = page.getByTestId('cityto');
        this.getZipto = page.getByTestId('zipto');
        this.getStreetto = page.getByTestId('streetto');
        this.getFloorto = page.getByTestId('floorto');
        this.getElevatorto = page.getByTestId('elevatorto').getByRole('checkbox');
        this.getPackagingservice = page.getByTestId('packagingservice').getByRole('checkbox');
        this.getSendbutton = page.getByTestId('sendbutton');
    }

    async goto() {
        await this.page.goto('http://localhost:4200/request-relocation');
    }

    async fillForm(
        clientName: string,
        relocationDate: string,
        relocationTime: string,
        cityFrom: string,
        zipFrom: string,
        streetFrom: string,
        floorFrom: string,
        cityTo: string,
        zipTo: string,
        streetTo: string,
        floorTo: string
    ): Promise<void> {
        await this.getClientName.fill(clientName);
        await this.getRelocationdate.fill(relocationDate);
        await this.getRelocationtime.fill(relocationTime);
        await this.getCityfrom.fill(cityFrom);
        await this.getZipfrom.fill(zipFrom);
        await this.getStreetfrom.fill(streetFrom);
        await this.getFloorfrom.fill(floorFrom);
        await this.getCityto.fill(cityTo);
        await this.getZipto.fill(zipTo);
        await this.getStreetto.fill(streetTo);
        await this.getFloorto.fill(floorTo);
    }

    async checkElevatorFrom() {
        await this.getElevatorfrom.check();
    }

    async uncheckElevatorFrom() {
        await this.getElevatorfrom.uncheck();
    }

    async checkElevatorTo() {
        await this.getElevatorto.check();
    }

    async uncheckElevatorTo() {
        await this.getElevatorto.uncheck();
    }

    async checkPackagingService() {
        await this.getPackagingservice.check();
    }

    async uncheckPackagingService() {
        await this.getPackagingservice.uncheck();
    }

    async send(): Promise<void> {
        await this.getSendbutton.click();
    }
}