import { expect, test } from '@playwright/test'

test('homepage has title and navigation', async ({ page }) => {
  await page.goto('/')

  // 페이지 제목 확인
  await expect(page).toHaveTitle(/부동산 계산기/)

  // 메인 헤더 확인
  await expect(
    page.getByRole('heading', { name: '부동산 계산기' }),
  ).toBeVisible()

  // 계산기 카드들 확인
  await expect(page.getByText('매입 비용 계산기')).toBeVisible()
  await expect(page.getByText('DSR 계산기')).toBeVisible()
  await expect(page.getByText('청약 계산기')).toBeVisible()
})

test('navigation to purchase cost calculator', async ({ page }) => {
  await page.goto('/')

  // 매입 비용 계산기 링크 클릭
  await page.getByRole('link', { name: /매입 비용 계산기/ }).click()

  // URL 확인
  await expect(page).toHaveURL('/calculators/purchase-cost')

  // 페이지 제목 확인
  await expect(
    page.getByRole('heading', { name: '매입 비용 계산기' }),
  ).toBeVisible()
})

test('navigation to DSR calculator', async ({ page }) => {
  await page.goto('/')

  // DSR 계산기 링크 클릭
  await page.getByRole('link', { name: /DSR 계산기/ }).click()

  // URL 확인
  await expect(page).toHaveURL('/calculators/dsr')

  // 페이지 제목 확인
  await expect(page.getByRole('heading', { name: 'DSR 계산기' })).toBeVisible()
})

test('map section is visible on homepage', async ({ page }) => {
  await page.goto('/')

  // 지도 섹션 확인
  await expect(page.getByText('부동산 위치 확인')).toBeVisible()
  await expect(
    page.getByText('지도에서 원하는 지역의 부동산 위치를 확인하고'),
  ).toBeVisible()
})
