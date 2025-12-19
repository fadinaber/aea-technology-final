# Redirect Testing Script for AEA Technology Site
# Run this against your Vercel staging URL to verify all redirects work

param(
    [string]$BaseUrl = "http://localhost:3000"
)

Write-Host "Testing redirects for: $BaseUrl" -ForegroundColor Cyan
Write-Host ""

# Critical old URLs from Webflow sitemap that must redirect
$testUrls = @(
    @{ path = "/press-releases"; expected = "/press"; description = "Press releases" },
    @{ path = "/contact-us"; expected = "/contact"; description = "Contact us" },
    @{ path = "/avionics-kits"; expected = "/products/e20-20-avionics"; description = "Avionics kits" },
    @{ path = "/e2020-tdr"; expected = "/products/e20-20n"; description = "E2020 TDR" },
    @{ path = "/via-echo"; expected = "/products/via-bravo-ex2"; description = "VIA Echo" },
    @{ path = "/mri-bravo"; expected = "/products/via-bravo-mri-3000"; description = "MRI Bravo" },
    @{ path = "/our-philosophy"; expected = "/about"; description = "Our philosophy" },
    @{ path = "/support"; expected = "/resources"; description = "Support" },
    @{ path = "/application-notes"; expected = "/resources?tab=application-notes"; description = "Application notes" },
    @{ path = "/us-distributors"; expected = "/contact/distributors"; description = "US distributors" },
    @{ path = "/index.php"; expected = "/"; description = "Old index.php" },
    @{ path = "/index.htm"; expected = "/"; description = "Old index.htm" }
)

$results = @()
$passed = 0
$failed = 0

foreach ($test in $testUrls) {
    $url = $BaseUrl.TrimEnd('/') + $test.path
    try {
        $response = Invoke-WebRequest -Uri $url -MaximumRedirection 0 -ErrorAction SilentlyContinue
        
        if ($response.StatusCode -eq 301 -or $response.StatusCode -eq 308) {
            $location = $response.Headers.Location
            if ($location -like "*$($test.expected)*") {
                $status = "✓ PASS"
                $passed++
                Write-Host "$status - $($test.description): $($test.path) → $location" -ForegroundColor Green
            } else {
                $status = "✗ FAIL (wrong destination)"
                $failed++
                Write-Host "$status - $($test.description): $($test.path) → $location (expected: $($test.expected))" -ForegroundColor Red
            }
        } elseif ($response.StatusCode -eq 200) {
            $status = "✗ FAIL (no redirect)"
            $failed++
            Write-Host "$status - $($test.description): $($test.path) returned 200 (should redirect)" -ForegroundColor Red
        } else {
            $status = "✗ FAIL (unexpected status)"
            $failed++
            Write-Host "$status - $($test.description): $($test.path) returned $($response.StatusCode)" -ForegroundColor Red
        }
        
        $results += [PSCustomObject]@{
            Path = $test.path
            Status = $status
            Location = $location
            Expected = $test.expected
        }
    } catch {
        $status = "✗ ERROR"
        $failed++
        Write-Host "$status - $($test.description): $($test.path) - $($_.Exception.Message)" -ForegroundColor Red
        $results += [PSCustomObject]@{
            Path = $test.path
            Status = $status
            Location = "N/A"
            Expected = $test.expected
        }
    }
}

Write-Host ""
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "Summary: $passed passed, $failed failed" -ForegroundColor $(if ($failed -eq 0) { "Green" } else { "Yellow" })
Write-Host "========================================" -ForegroundColor Cyan

if ($failed -gt 0) {
    Write-Host ""
    Write-Host "Failed tests:" -ForegroundColor Red
    $results | Where-Object { $_.Status -like "*FAIL*" -or $_.Status -like "*ERROR*" } | Format-Table -AutoSize
    exit 1
} else {
    Write-Host "All redirects working correctly!" -ForegroundColor Green
    exit 0
}

