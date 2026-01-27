import React, { useState } from 'react';
import { Page } from '@strapi/strapi/admin';
import {
  Box,
  Button,
  Typography,
  Grid,
  Alert,
} from '@strapi/design-system';
import { Download } from '@strapi/icons';

const ExportPage = () => {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);

  const handleExport = async (endpoint, filename) => {
    setLoading(true);
    setMessage(null);
    setError(null);

    try {
      // Get auth token from localStorage
      const token = localStorage.getItem('jwtToken') || sessionStorage.getItem('jwtToken');
      
      const headers = {
        'Content-Type': 'application/json',
      };
      
      if (token) {
        headers['Authorization'] = `Bearer ${token}`;
      }

      const response = await fetch(`/api/export/${endpoint}`, {
        method: 'GET',
        headers,
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Export failed: ${response.statusText} - ${errorText}`);
      }

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${filename}-${new Date().toISOString().split('T')[0]}.csv`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);

      setMessage(`Successfully exported ${filename}!`);
    } catch (err) {
      console.error('Export error:', err);
      setError(err.message || 'Failed to export data');
    } finally {
      setLoading(false);
    }
  };

  const exportOptions = [
    { 
      endpoint: 'all-visitor-data', 
      filename: 'all-visitor-data',
      label: 'All Visitor Data', 
      description: 'Export all visitor interactions (CTA, chatbot, partners, newsletter)' 
    },
    { 
      endpoint: 'visitors', 
      filename: 'visitors',
      label: 'Visitors', 
      description: 'Export all website visitors with IP, country, city, device info' 
    },
    { 
      endpoint: 'cta-inquiries', 
      filename: 'cta-inquiries',
      label: 'CTA Inquiries', 
      description: 'Export all CTA inquiry submissions' 
    },
    { 
      endpoint: 'chatbot-interactions', 
      filename: 'chatbot-interactions',
      label: 'Chatbot Interactions', 
      description: 'Export all chatbot conversation data' 
    },
    { 
      endpoint: 'partner-requests', 
      filename: 'partner-requests',
      label: 'Partner Requests', 
      description: 'Export all partnership requests' 
    },
    { 
      endpoint: 'newsletter-subscriptions', 
      filename: 'newsletter-subscriptions',
      label: 'Newsletter Subscriptions', 
      description: 'Export all newsletter subscribers' 
    },
  ];

  return (
    <Page.Main>
      <Page.Title>Export Data</Page.Title>
      
      <Box padding={8}>
        {message && (
          <Box marginBottom={4}>
            <Alert
              closeLabel="Close"
              title="Success"
              variant="success"
              onClose={() => setMessage(null)}
            >
              {message}
            </Alert>
          </Box>
        )}
        
        {error && (
          <Box marginBottom={4}>
            <Alert
              closeLabel="Close"
              title="Error"
              variant="danger"
              onClose={() => setError(null)}
            >
              {error}
            </Alert>
          </Box>
        )}

        <Typography variant="omega" textColor="neutral600" marginBottom={4}>
          Download your content as CSV files
        </Typography>

        <Grid.Root gap={4}>
          {exportOptions.map((option) => (
            <Grid.Item key={option.endpoint} col={12} s={12} xs={12}>
              <Box
                padding={4}
                hasRadius
                background="neutral100"
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}
              >
                <Box>
                  <Typography variant="beta" fontWeight="bold">
                    {option.label}
                  </Typography>
                  <Typography variant="omega" textColor="neutral600">
                    {option.description}
                  </Typography>
                </Box>
                <Button
                  onClick={() => handleExport(option.endpoint, option.filename)}
                  loading={loading}
                  startIcon={<Download />}
                  size="L"
                >
                  Export CSV
                </Button>
              </Box>
            </Grid.Item>
          ))}
        </Grid.Root>

        <Box marginTop={6} padding={4} background="neutral150" hasRadius>
          <Typography variant="omega" textColor="neutral700">
            <strong>Note:</strong> Exported files are in CSV format for easy import into spreadsheet applications.
            Each export contains all data for the selected content type.
          </Typography>
        </Box>
      </Box>
    </Page.Main>
  );
};

export default ExportPage;
