import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:4200/request-relocation');
});

test('has title', async ({ page }) => {
    
    // Expect a title "to contain" a substring.
    await expect(page).toHaveTitle(/Relocation/);
});

test('has header title', async ({ page }) => {
    await expect(page.locator('app-header')).toContainText('Relocation');
});

test('has page title', async ({ page }) => {
  await expect(page.locator('h2')).toContainText('Add Request');
});

test.describe('form field group', {
    tag: '@formfields'
}, () => {
    test('has request form fields - input', async ({ page }) => {
        await expect(page.getByTestId('clientname')).toBeVisible();
        await expect(page.getByTestId('relocationdate')).toBeVisible();
        await expect(page.getByTestId('relocationtime')).toBeVisible();
        await expect(page.getByTestId('cityfrom')).toBeVisible();
        await expect(page.getByTestId('zipfrom')).toBeVisible();
        await expect(page.getByTestId('streetfrom')).toBeVisible();
        await expect(page.getByTestId('floorfrom')).toBeVisible();
        await expect(page.getByTestId('elevatorfrom')).toBeVisible();
        await expect(page.getByTestId('cityto')).toBeVisible();
        await expect(page.getByTestId('zipto')).toBeVisible();
        await expect(page.getByTestId('streetto')).toBeVisible();
        await expect(page.getByTestId('floorto')).toBeVisible();
        await expect(page.getByTestId('elevatorto')).toBeVisible();
        await expect(page.getByTestId('packagingservice')).toBeVisible();
    });

    test('has request form fields - label', async ({ page }) => {
        await expect(page.getByTestId('clientname_label')).toBeVisible();
        await expect(page.getByTestId('relocationdate_label')).toBeVisible();
        await expect(page.getByTestId('relocationtime_label')).toBeVisible();
        await expect(page.getByTestId('cityfrom_label')).toBeVisible();
        await expect(page.getByTestId('zipfrom_label')).toBeVisible();
        await expect(page.getByTestId('streetfrom_label')).toBeVisible();
        await expect(page.getByTestId('floorfrom_label')).toBeVisible();
        await expect(page.getByTestId('cityto_label')).toBeVisible();
        await expect(page.getByTestId('zipto_label')).toBeVisible();
        await expect(page.getByTestId('streetto_label')).toBeVisible();
        await expect(page.getByTestId('floorto_label')).toBeVisible();
    });

    test('has hidden request form fields - error', async ({ page }) => {
        await expect(page.getByTestId('clientname_error')).toBeHidden();
        await expect(page.getByTestId('relocationdate_error')).toBeHidden();
        await expect(page.getByTestId('relocationtime_error')).toBeHidden();
        await expect(page.getByTestId('cityfrom_error')).toBeHidden();
        await expect(page.getByTestId('zipfrom_error')).toBeHidden();
        await expect(page.getByTestId('streetfrom_error')).toBeHidden();
        await expect(page.getByTestId('floorfrom_error')).toBeHidden();
        await expect(page.getByTestId('cityto_error')).toBeHidden();
        await expect(page.getByTestId('zipto_error')).toBeHidden();
        await expect(page.getByTestId('streetto_error')).toBeHidden();
        await expect(page.getByTestId('floorto_error')).toBeHidden();
    });

    test('has hidden request form fields - message', async ({ page }) => {
        await expect(page.getByTestId('positiverequestmessage')).toBeHidden();
    });

    test('has send request and abort buttons', async ({ page }) => {
        await expect(page.getByTestId('sendbutton')).toBeVisible();
        await expect(page.getByTestId('abortbutton')).toBeVisible();
    });
});

test.describe('error content group', {
    tag: '@errors'
}, () => {
    test('error - empty client name', async ({ page }) => {
        await page.getByTestId('clientname').fill('');
        await page.getByTestId('cityfrom').fill('');
        await expect(page.getByTestId('clientname_error')).toBeVisible();
    });

    test('error - empty relocation date', async ({ page }) => {
        await page.getByTestId('relocationdate').fill('');
        await page.getByTestId('cityfrom').fill('');
        await expect(page.getByTestId('relocationdate_error')).toBeVisible();
    });

    test('error - empty relocation time', async ({ page }) => {
        await page.getByTestId('relocationtime').fill('');
        await page.getByTestId('cityfrom').fill('');
        await expect(page.getByTestId('relocationtime_error')).toBeVisible();
    });

    test('error - empty city from', async ({ page }) => {
        await page.getByTestId('cityfrom').fill('');
        await page.getByTestId('clientname').fill('');
        await expect(page.getByTestId('cityfrom_error')).toBeVisible();
    });

    test('error - empty zip from', async ({ page }) => {
        await page.getByTestId('zipfrom').fill('');
        await page.getByTestId('clientname').fill('');
        await expect(page.getByTestId('zipfrom_error')).toBeVisible();
    });

    test('error - empty street from', async ({ page }) => {
        await page.getByTestId('streetfrom').fill('');
        await page.getByTestId('clientname').fill('');
        await expect(page.getByTestId('streetfrom_error')).toBeVisible();
    });

    test('error - empty floor from', async ({ page }) => {
        await page.getByTestId('floorfrom').fill('');
        await page.getByTestId('clientname').fill('');
        await expect(page.getByTestId('floorfrom_error')).toBeVisible();
    });

    test('error - empty city to', async ({ page }) => {
        await page.getByTestId('cityto').fill('');
        await page.getByTestId('clientname').fill('');
        await expect(page.getByTestId('cityto_error')).toBeVisible();
    });

    test('error - empty zip to', async ({ page }) => {
        await page.getByTestId('zipto').fill('');
        await page.getByTestId('clientname').fill('');
        await expect(page.getByTestId('zipto_error')).toBeVisible();
    });

    test('error - empty street to', async ({ page }) => {
        await page.getByTestId('streetto').fill('');
        await page.getByTestId('clientname').fill('');
        await expect(page.getByTestId('streetto_error')).toBeVisible();
    });

    test('error - empty floor to', async ({ page }) => {
        await page.getByTestId('floorto').fill('');
        await page.getByTestId('clientname').fill('');
        await expect(page.getByTestId('floorto_error')).toBeVisible();
    });
});

test.describe('abort group', {
    tag: '@abort'
}, () => {

    test('click abort - reset clientname ', async ({ page }) => {
        await page.getByTestId('clientname').fill('123');
        await page.getByTestId('abortbutton').click();
        await expect(page.getByTestId('clientname')).toBeEmpty();
    });

    test('click abort - reset relocationdate ', async ({ page }) => {
        await page.getByTestId('relocationdate').fill('123');
        await page.getByTestId('abortbutton').click();
        await expect(page.getByTestId('relocationdate')).toBeEmpty();
    });

    test('click abort - reset relocationtime ', async ({ page }) => {
        await page.getByTestId('relocationtime').fill('123');
        await page.getByTestId('abortbutton').click();
        await expect(page.getByTestId('relocationtime')).toBeEmpty();
    });

    test('click abort - reset cityfrom', async ({ page }) => {
        await page.getByTestId('cityfrom').fill('123');
        await page.getByTestId('abortbutton').click();
        await expect(page.getByTestId('cityfrom')).toBeEmpty();
    });

    test('click abort - reset zipfrom', async ({ page }) => {
        await page.getByTestId('zipfrom').fill('123');
        await page.getByTestId('abortbutton').click();
        await expect(page.getByTestId('zipfrom')).toBeEmpty();
    });

    test('click abort - reset streetfrom', async ({ page }) => {
        await page.getByTestId('streetfrom').fill('123');
        await page.getByTestId('abortbutton').click();
        await expect(page.getByTestId('streetfrom')).toBeEmpty();
    });

    test('click abort - reset floorfrom', async ({ page }) => {
        await page.getByTestId('floorfrom').fill('123');
        await page.getByTestId('abortbutton').click();
        await expect(page.getByTestId('floorfrom')).toBeEmpty();
    });

    test('click abort - reset elevatorfrom', async ({ page }) => {
        await page.getByTestId('elevatorfrom').getByRole('checkbox').check();
        await page.getByTestId('abortbutton').click();
        await expect(page.getByTestId('elevatorfrom').getByRole('checkbox')).not.toBeChecked();
    });

    test('click abort - reset cityto', async ({ page }) => {
        await page.getByTestId('cityto').fill('123');
        await page.getByTestId('abortbutton').click();
        await expect(page.getByTestId('cityto')).toBeEmpty();
    });

    test('click abort - reset zipto', async ({ page }) => {
        await page.getByTestId('zipto').fill('123');
        await page.getByTestId('abortbutton').click();
        await expect(page.getByTestId('zipto')).toBeEmpty();
    });

    test('click abort - reset streetto', async ({ page }) => {
        await page.getByTestId('streetto').fill('123');
        await page.getByTestId('abortbutton').click();
        await expect(page.getByTestId('streetto')).toBeEmpty();
    });

    test('click abort - reset floorto', async ({ page }) => {
        await page.getByTestId('floorto').fill('123');
        await page.getByTestId('abortbutton').click();
        await expect(page.getByTestId('floorto')).toBeEmpty();
    });

    test('click abort - reset elevatorto', async ({ page }) => {
        await page.getByTestId('elevatorto').getByRole('checkbox').check();
        await page.getByTestId('abortbutton').click();
        await expect(page.getByTestId('elevatorto').getByRole('checkbox')).not.toBeChecked();
    });

    test('click abort - reset packagingservice', async ({ page }) => {
        await page.getByTestId('packagingservice').getByRole('checkbox').check();
        await page.getByTestId('abortbutton').click();
        await expect(page.getByTestId('packagingservice').getByRole('checkbox')).not.toBeChecked();
    });
});

test.describe('send request positive group', {
    tag: '@sendrequest'
}, () => {

    test.beforeEach(async ({ page }) => {
        await page.goto('http://localhost:4200/request-relocation');
        await page.getByTestId('clientname').fill('Max Huber');
        await page.getByTestId('relocationdate').fill('12/12/2025');
        await page.getByTestId('relocationtime').fill('12:30 PM');
        await page.getByTestId('cityfrom').fill('Siegendorf');
        await page.getByTestId('zipfrom').fill('7011');
        await page.getByTestId('streetfrom').fill('Technologiestr. 1');
        await page.getByTestId('floorfrom').fill('0');
        await page.getByTestId('elevatorfrom').getByRole('checkbox').check();
        await page.getByTestId('cityto').fill('Siegendorf');
        await page.getByTestId('zipto').fill('7011');
        await page.getByTestId('streetto').fill('Technologiestr. 2');
        await page.getByTestId('floorto').fill('1');
        await page.getByTestId('elevatorto').getByRole('checkbox').check();
        await page.getByTestId('packagingservice').getByRole('checkbox').check();
        await page.getByTestId('sendbutton').click();
    });

    test('click send request - reset clientname ', async ({ page }) => {
        await expect(page.getByTestId('clientname')).toBeEmpty();
    });

    test('click send request - reset relocationdate ', async ({ page }) => {
        await expect(page.getByTestId('relocationdate')).toBeEmpty();
    });

    test('click send request - reset relocationtime ', async ({ page }) => {
        await expect(page.getByTestId('relocationtime')).toBeEmpty();
    });

    test('click send request - reset cityfrom', async ({ page }) => {
        await expect(page.getByTestId('cityfrom')).toBeEmpty();
    });

    test('click send request - reset zipfrom', async ({ page }) => {
        await expect(page.getByTestId('zipfrom')).toBeEmpty();
    });

    test('click send request - reset streetfrom', async ({ page }) => {
        await expect(page.getByTestId('streetfrom')).toBeEmpty();
    });

    test('click send request - reset floorfrom', async ({ page }) => {
        await expect(page.getByTestId('floorfrom')).toBeEmpty();
    });

    test('click send request - reset elevatorfrom', async ({ page }) => {
        await expect(page.getByTestId('elevatorfrom').getByRole('checkbox')).not.toBeChecked();
    });

    test('click send request - reset cityto', async ({ page }) => {
        await expect(page.getByTestId('cityto')).toBeEmpty();
    });

    test('click send request - reset zipto', async ({ page }) => {
        await expect(page.getByTestId('zipto')).toBeEmpty();
    });

    test('click send request - reset streetto', async ({ page }) => {
        await expect(page.getByTestId('streetto')).toBeEmpty();
    });

    test('click send request - reset floorto', async ({ page }) => {
        await expect(page.getByTestId('floorto')).toBeEmpty();
    });

    test('click send request - reset elevatorto', async ({ page }) => {
        await expect(page.getByTestId('elevatorto').getByRole('checkbox')).not.toBeChecked();
    });

    test('click send request - reset packagingservice', async ({ page }) => {
        await expect(page.getByTestId('packagingservice').getByRole('checkbox')).not.toBeChecked();
    });

    test('click send request - positive response', async ({ page }) => {
        await expect(page.getByTestId('packagingservice').getByRole('checkbox')).not.toBeChecked();
    });
});